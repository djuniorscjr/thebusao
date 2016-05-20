(function() {
    'use strict';
    angular.module('thebusao')
        .factory('fixtureFactory', fixtureFactory);

    fixtureFactory.$inject = ['$http', 'URL', '$window', '$rootScope'];

    function fixtureFactory($http, URL, $window, $rootScope){
        return {
            initTokenValidRequest: initTokenValidRequest,
            getTokenValidRequest: getTokenValidRequest
        };

        function initTokenValidRequest() {
            $rootScope.$on('getToken', function(){
                $http.get(URL + "/v1/token")
                .then(getTokenValidRequestSuccefuly)
                .catch(getTokenValidRequestFailed);

                function getTokenValidRequestSuccefuly(response) {
                    $window.localStorage.setItem('data', response.data.token);
                };

                function getTokenValidRequestFailed(error) {
                    console.log(error);
                };

            });
        };

        function getTokenValidRequest() {
            $rootScope.$broadcast('getToken');
        };
    };
})();
