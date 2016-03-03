'use strict';

/**
 * @ngdoc function
 * @name zendeskChallengeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zendeskChallengeApp
 */
angular.module('zendeskChallengeApp')
  .controller('MainCtrl', function ($scope,$q, Honeypot, dShieldApi, PhishTank, spinnerService) {
      
    //IOC form binding    
    $scope.ioc = {ip: null, port: null, url : null};
    //results binding
    $scope.results = [];
    
    //Infinite scroll data to show
    $scope.data = [];
    
    $scope.iocLookUp= function() {
        //Array to recolting Ids from queries to honeypot
        var ids = []
        //array to stock promises returned by different services
        var honeyPotPromises = [];
        var dShieldPromises = [];
        var phishTankPromises = [];
        
        $scope.ipInfo = false;
        $scope.portInfo = false;
        
        //Result init
        $scope.results = [];
        $scope.dshield = {count: null,attacks: null, name: null, country: null};
        
        if( $scope.ioc.ip ) {
                spinnerService.show('honeypotSpinner');
                //Looking Up IP in Honeypot...
                honeyPotPromises.push(Honeypot.findByIP($scope.ioc.ip));
            
                spinnerService.show('dshieldSpinner');
                $scope.ipInfo = true;
                //Looking Up IP in DShield...
                dShieldPromises.push(dShieldApi.findByIP($scope.ioc.ip));
        }
        if( $scope.ioc.port ) {
                spinnerService.show('honeypotSpinner');
                //Looking Up Port in Honeypot...
                honeyPotPromises.push(Honeypot.findByPort($scope.ioc.port));

                spinnerService.show('dshieldSpinner');
                $scope.portInfo = true;
                //Looking Up IP in DShield...
                dShieldPromises.push(dShieldApi.findByPort($scope.ioc.port));

            
        }
        if( $scope.ioc.url ) {
           //Looking Up Url in Honeypot...
            honeyPotPromises.push(Honeypot.findByUrl($scope.ioc.url));
            
            //Looking Up Url in PhishTank...
            phishTankPromises.push(PhishTank.findByUrl($scope.ioc.url));
        }
        
        //Waiting for all promises to resolve [Async]
        
        $q.all(honeyPotPromises)
        .then(function (data){
            spinnerService.hide('honeypotSpinner');
            //getting id of results
            for(var i = 0; i < honeyPotPromises.length; i++){
                data = JSON.parse(data[i].slice(0, -1));
                for(var j = 0; j < data.rows.length; j++){
                    ids.push(data.rows[j].id);
                }
            }
            
            //deleting duplicates
            ids = uniq(ids);
            
            //populating results
            for(var i = 0; i < ids.length ; i++){
                Honeypot.findById(ids[i])
                        .then(function (data){
                                data = JSON.parse(data.slice(0, -1));
                                data.time = data.time.$date;
                                //Reformtting of results if "channel" : "glastopf.events"
                                if(!data.source){
                                    data.source = "honeypot";
                                    $scope.results.push(data);
                                }
                                else{
                                    data.attackerIP = data.source[0];
                                    data.attackerPort = data.source[1];
                                    data.source = "honeypot";
                                    $scope.results.push(data);
                                }
                                
                                //Infinite Scroll: Show initialy only 10 rows 
                                $scope.data = $scope.results.slice(0, 10);
                        }, function(reason) {
                                console.log(reason);
                        });
            }
       
            
        }, function(reason) {
                console.log(reason);
        });
    
    
        $q.all(dShieldPromises)
        .then(function (data){
            spinnerService.hide('dshieldSpinner');
            for(var i = 0; i < dShieldPromises.length; i++){
                data = JSON.parse(data[i].slice(0, -1));
                if(data.hasOwnProperty('ip')){
                    var result = {};
                    result.attackerIP =  data.ip.number;
                    result.attackerPort = data.ip.as;
                    result.source = "DShield API";
                    result.time = data.ip.updated;
                    $scope.results.push(result);
                    
                    //DShield API IP Adress Info
                    $scope.dshieldIP = {count: data.ip.count,attacks: data.ip.attacks, name: data.ip.asname, country: data.ip.ascountry};
                }
                if(data.hasOwnProperty('data')){
                    $scope.results.push(result);
                    //DShield API Port Info
                    $scope.dshieldPort = {records: data.data.records,sources: data.data.sources, targets : data.data.targets, tcp: data.data.tcp, udp: data.data.udp, date: data.data.date};
                    
                }
                    
            }
            
            
        }, function(reason) {
                console.log(reason);
        });
        
        $q.all(phishTankPromises)
        .then(function (data){
            $scope.phishtank = data[0];
            console.log(data[0]);
        },function(reason){
            console.log(reason);
        });
        

        $scope.ioc = {ip: null, port: null, url : null};
    };
    
    function uniq(arr) {
        var seen = {}, result = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var el = arr[i];
            if (!seen[el]) {
            seen[el] = true;
            result.push(el);
            }
        }
        return result;
    }
    
    $scope.getMoreData = function () {
        $scope.data = $scope.results.slice(0, $scope.data.length + 5);
    }
  });

