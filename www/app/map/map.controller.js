(function() {
    'use strict';
    angular.module('thebusao')
        .controller('mapController', mapController);

    mapController.$inject = ['fixtureFactory', 'mapFactory', '$scope', '$timeout', '$ionicPopup', 'NgMap',
        'geolocationService'];

    function mapController(fixtureFactory, mapFactory, $scope, $timeout, $ionicPopup, NgMap, 
            geolocationService){

        var vm = this;

        vm.linesAll = [];
        vm.busAll = [];
        vm.p = [-5.0958287, -42.7843285];
        vm.zoom = 10;
        getToken();

        vm.setBusMap = setBusMap;
        vm.showDetail = showDetail;
        vm.getCenterLocation = getCenterLocation;

        NgMap.getMap().then(function(map) {
            vm.map = map;
        });

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

        function showDetail(e, bus) {
            vm.bus = bus;
            vm.map.showInfoWindow('bal', vm.bus.CodigoVeiculo);
        };

        function getCenterLocation() {
            geolocationService().then(function(position) {
                vm.userPosition = [];
                vm.userPosition[0] = position.coords.latitude;
                vm.userPosition[1] = position.coords.longitude;
                vm.zoom = 12;
                vm.map.setCenter(
                    new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude));
            }).catch(function(err) {
                vm.alertPopup = $ionicPopup.alert({
                    title: 'Aviso!',
                    template: 'Para obter sua posição ative seu GPS e'
                    + 'clique novamente no icone de localização'
                });
            });
        };
    };
})();

