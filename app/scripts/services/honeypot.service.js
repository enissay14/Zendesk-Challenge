'use strict';

/**
 * @ngdoc service
 * @name zendeskChallengeApp.HoneyPotRepository
 * @description
 * # HoneyPotRepository
 * Factory in the zendeskChallengeApp.
 */
angular.module('zendeskChallengeApp')
  .factory('Honeypot', function ($q,$http) {
    
    var honeyPotRepository= {};
    
    honeyPotRepository.findById= function(id){
            
            var deferred = $q.defer();
            $http.get('/honeypot.php?id='+ id )
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
      
        };
        
    honeyPotRepository.findByIP = function(ip){
            
            var deferred = $q.defer();
            $http.get('/honeypot.php?ip='+ ip )
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
      
        };
        
        honeyPotRepository.findByPort = function(port){
            
            var deferred = $q.defer();
//             $http.get(appSettings.db + '/_design/honeypot/_view/byPort?key='+ port)
            $http.get('/honeypot.php?port='+port)
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
      
        };
        
        honeyPotRepository.findByUrl = function(url){
            
            var deferred = $q.defer();
            $http.get('/honeypot.php?url='+ url )
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
      
        };
        
    return honeyPotRepository;
    
    
  });

