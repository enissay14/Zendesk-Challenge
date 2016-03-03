'use strict';

/**
 * @ngdoc service
 * @name zendeskChallengeApp.HoneyPotRepository
 * @description
 * # HoneyPotRepository
 * Factory in the zendeskChallengeApp.
 */
angular.module('zendeskChallengeApp')
  .factory('PhishTank', function ($q,$http) {
    
        var phishTankRepository= {};
        
        phishTankRepository.findByUrl = function(url){
            
            var deferred = $q.defer();
//             $http.get('/phishtank/checkurl/index.php?url="'+url+'"&format="json"&app_key="'+appSettings.phishTank_apiKey+'"')
            $http.get('phishtank.php?url='+url)
            .success(function(data) { 
                deferred.resolve(data);
            }).error(function(error) {
                deferred.reject(error);
            });
            
            return deferred.promise;
      
        };
        
    return phishTankRepository;
    
    
  });

