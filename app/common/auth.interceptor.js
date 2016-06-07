(function() {
    'use strict';
    angular.module('thebusao')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$window', '$q', 'URL'];

    function authFactory($window, $q, URL){
        return {
            request: request,
            response: response,
            responseError: responseError,
            requestError: responseError
        };

        function request(config) {
            config.headers = config.headers || {};
            if($window.localStorage.getItem('data') && config.url != URL + "/v1/token"){
                config.headers['x-access-token'] = $window.localStorage.getItem('data');
            }
            return config || $q.when(config);
        };

        function response(response) {
            return response || $q.when(response);
        };

        function requestError(err){ 
            return err || $q.when(err);
        };

        function responseError(err) {
            return $q.reject(err);
        };
    };
})();
