angular.module('thebusao', ['ionic'])

.run(function($ionicPlatform, fixtureFactory) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        fixtureFactory.initTokenValidRequest();
    });
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('map',{
            url: '/map',
            templateUrl: 'app/map/map.html',
            controller: 'mapController as vm'
    });

    $urlRouterProvider.otherwise('/map');
    $httpProvider.interceptors.push('authFactory');
})
.constant('URL', 'https://thebusao.herokuapp.com/api');

