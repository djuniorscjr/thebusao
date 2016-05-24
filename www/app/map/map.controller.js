(function() {
    'use strict';
    angular.module('thebusao')
        .controller('mapController', mapController);

    mapController.$inject = ['fixtureFactory', 'mapFactory', '$scope', '$timeout', '$ionicPopup'];

    function mapController(fixtureFactory, mapFactory, $scope, $timeout, $ionicPopup){
        var vm = this;

        vm.linesAll = [];
        vm.busAll = [];
        vm.p = [-5.0958287, -42.7843285];
        vm.zoom = 10;
        getToken();

        vm.setBusMap = setBusMap;

        function getToken() {
            fixtureFactory.getTokenValidRequest()
                .then(function(data){
                getAllLines();
            });
        };

        function getAllVehicles(code) {
            mapFactory.getVehicles(code)
                .then(function(data){
                    if(data.length == 0){
                        vm.alertPopup = $ionicPopup.alert({
                           title: 'Aviso!',
                           template: 'Não á onibus disponível no momento'
                        });
                        vm.bus = "";
                    }else{
                        vm.busAll = data;
                        vm.search = data[0].Denomicao;
                    }
            });
        };

        function getAllLines(line) {
            mapFactory.getLines(line)
                .then(function(data){
                    vm.linesAll = data;
            });
        };

        function setBusMap(bus) {
            getAllVehicles(bus.CodigoLinha);
        };

    };
})();

