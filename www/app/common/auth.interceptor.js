(function() {
    'use strict';
    angular.module('thebusao')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$window', '$q', 'URL'];

    function authFactory($window, $q, URL){
        return {
            request: request
        };

        function request(config) {
            config.headers = config.headers || {};
            if($window.localStorage.getItem('data') && config.url != URL + "/v1/token"){
                config.headers['x-access-token'] = $window.localStorage.getItem('data');
            }
            return config || $q.when(config);
        };
    };
})();
