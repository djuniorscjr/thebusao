(function() {
    'use strict';
    angular.module('thebusao')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$window', '$q', 'URL', '$timeout', '$injector'];

    function authFactory($window, $q, URL, $timeout, $injector){
        return {
            request: request,
            response: response,
            responseError: responseError,
            requestError: responseError
        };

        function showLoading(){
            $injector.get("$ionicLoading").show({
                template: "Carregando",
                animate: 'fade-in',
                showBackdrop: true
            });
        };

        function hideLoading() {
            $injector.get("$ionicLoading").hide();
        };

        function request(config) {
            showLoading();
            config.headers = config.headers || {};
            if($window.localStorage.getItem('data') && config.url != URL + "/v1/token"){
                config.headers['x-access-token'] = $window.localStorage.getItem('data');
            }
            return config || $q.when(config);
        };

        function response(response) {
            $timeout(function(){
                hideLoading();
            }, 300);
            return response || $q.when(response);
        };

        function requestError(err){ 
            hideLoading();
            return err || $q.when(err);
        };

        function responseError(err) {
            hideLoading();
            return $q.reject(err);
        };
    };
})();
