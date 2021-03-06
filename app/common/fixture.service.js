(function() {
    'use strict';
    angular.module('thebusao')
        .factory('fixtureFactory', fixtureFactory);

    fixtureFactory.$inject = ['$http', 'URL', '$window', '$rootScope', '$ionicLoading',
     '$ionicPlatform', '$cordovaNetwork'];

    function fixtureFactory($http, URL, $window, $rootScope, $ionicLoading, $ionicPlatform, $cordovaNetwork){

        return {
            getTokenValidRequest: getTokenValidRequest,
            getLoading: getLoading,
            keyboard: keyboard,
            addConnectivityListeners: addConnectivityListeners
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
                var template = img ? "<img src='img/" + img + ".svg' class='svg-inject' />":
                    '<div class="loader"></div';
                $ionicLoading.show({
                    template: template,
                    animate: "fade-in",
                    showBackdrop: true
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

        function addConnectivityListeners(){
          if(ionic.Platform.isWebView()){
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
              $ionicLoading.hide();
            });

            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
              $ionicLoading.show({
                template:'Aguardando conexão com a internet...'
              });
            });
          }
        };

    }
})();
