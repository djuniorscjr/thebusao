(function() {
    'use strict';
    angular.module('thebusao')
        .factory('fixtureFactory', fixtureFactory);

    fixtureFactory.$inject = ['$http', 'URL', '$window', '$rootScope', '$ionicLoading', '$ionicPlatform'];

    function fixtureFactory($http, URL, $window, $rootScope, $ionicLoading, $ionicPlatform){

        return {
            getTokenValidRequest: getTokenValidRequest,
            getLoading: getLoading,
            keyboard: keyboard
        };

        function getTokenValidRequest() {
            return $http.get(URL + "/v1/token")
                .then(getTokenValidRequestSuccefuly)
                .catch(getTokenValidRequestFailed);

                function getTokenValidRequestSuccefuly(response) {
                    $window.localStorage.setItem('data', response.data.token);
                    return true;
                };

                function getTokenValidRequestFailed(error) {
                    return false;
                };
        };

        function getLoading(opt, img) {
            opt ? showLoading(img) : hideLoading();

            function showLoading(img) {
                var template = img ? '<img src="/img/' + img + '.svg"/>': '<div class="loader"></div';
                $ionicLoading.show({
                    template: template,
                    animate: "fade-in"
                });
            };

            function hideLoading() {
                $ionicLoading.hide();
            };
        };

        function keyboard(opt) {
            $ionicPlatform.ready(function() {
                if(window.cordova && window.cordova.plugins.Keyboard){
                    if(opt){
                        cordova.plugins.Keyboard.show();
                    } else {
                        cordova.plugins.Keyboard.close();
                    }
                }
            });
        };
    };
})();
