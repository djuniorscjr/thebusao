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

        function showDetail(bus) {
            vm.bus = bus;
            vm.map.showInfoWindow('bal', vm.bus.CodigoVeiculo);
        };

        function getCenterLocation() {
            geolocationService().then(function(position) {
                var p = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                vm.zoom = 15;
                var marker = new google.maps.Marker({
                    position: p,
                    title: 'Você',
                    map:vm.map,
                    icon: 'img/home.png',
                    draggable: true
                });
                vm.map.setCenter(p);
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

