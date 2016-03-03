'use strict';

/**
 * @ngdoc service
 * @name zendeskChallengeApp.HoneyPotRepository
 * @description
 * # HoneyPotRepository
 * Factory in the zendeskChallengeApp.
 */
angular.module('zendeskChallengeApp')
  .factory('dShieldApi', function ($q,$http) {
    
    var dShieldApiRepository= {};
    

        
    dShieldApiRepository.findByIP = function(ip){
            
            var deferred = $q.defer();
            $http.get('http://isc.sans.edu/api/ip/'+ ip +'?json')
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
      
        };
        
        dShieldApiRepository.findByPort = function(port){
            
            var deferred = $q.defer();
            $http.get('http://isc.sans.edu/api/port/'+ port +'?json')
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
      
        };
        
    return dShieldApiRepository;
    
    
  });

