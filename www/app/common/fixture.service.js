(function() {
    'use strict';
    angular.module('thebusao')
        .factory('fixtureFactory', fixtureFactory);

    fixtureFactory.$inject = ['$http', 'URL', '$window', '$rootScope', '$ionicLoading'];

    function fixtureFactory($http, URL, $window, $rootScope, $ionicLoading){

        return {
            getTokenValidRequest: getTokenValidRequest,
            getLoading: getLoading
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
            if(opt){
                showLoading(img);
            }else{
                hideLoading();
            }

            function showLoading(img) {
                $ionicLoading.show({
                    template: "<img src='img/" + img + ".svg' class='svg-inject' />",
                    animate: "fade-in",
                    showBackdrop: true
                });
            };

            function hideLoading() {
                $ionicLoading.hide();
            };
        };
    };
})();
