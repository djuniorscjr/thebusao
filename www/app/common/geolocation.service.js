(function() {
  'use strict';
    angular
        .module('thebusao')
        .factory('geolocationService', geolocationService);
  
    geolocationService.$inject = ['$cordovaGeolocation', '$ionicPlatform', '$q'];

    function geolocationService($cordovaGeolocation, $ionicPlatform, $q) {
        return function() {
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: false
            };

            var deferred = $q.defer();
            $ionicPlatform.ready(function() {
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(getCurrentPositionSuccessfully, getCurrentPositionFailed);

                function getCurrentPositionSuccessfully(position) {
                    deferred.resolve(position);
                };
                
                function getCurrentPositionFailed(err){
                    deferred.reject(err);
                };

            });
            
            return deferred.promise;
        };
    };
})();
