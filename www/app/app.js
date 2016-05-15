angular.module('thebusao', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('map',{
        url: '/map',
        templateUrl: 'app/map/map.html',
        controller: 'mapController as vm'
    });

    $urlRouterProvider.otherwise('/map');
})

