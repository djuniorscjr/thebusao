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
        vm.large = true;

        vm.setBusMap = setBusMap;
        vm.showDetail = showDetail;
        vm.getCenterLocation = getCenterLocation;
        vm.clearSearch = clearSearch;

        fixtureFactory.getLoading(true);

        NgMap.getMap().then(function(map) {
            vm.map = map;
            getToken();
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
                           template: 'Não a ônibus disponível no momento',
                           okType:'button-calm'
                        });
                        vm.bus = "";
                    }else{
                        vm.busAll = data;
                        vm.search = data[0].Denomicao;
                        vm.large = false;
                        zoomIn(data);
                    }
                    fixtureFactory.getLoading(false);
            });
        };

        function getAllLines(line) {
            mapFactory.getLines(line)
                .then(function(data){
                    vm.linesAll = data;
                    fixtureFactory.getLoading(false);
            });
        };

        function setBusMap(bus) {
            fixtureFactory.keyboard(false);
            $timeout(function(){
                fixtureFactory.getLoading(true);
                getAllVehicles(bus.CodigoLinha);
            }, 1000);
        };

        function showDetail(e, bus) {
            vm.bus = bus;
            vm.map.showInfoWindow('bal', vm.bus.CodigoVeiculo);
        };

        function getCenterLocation() {
            fixtureFactory.getLoading(true);
            geolocationService().then(function(position) {
                vm.userPosition = [];
                vm.userPosition[0] = position.coords.latitude;
                vm.userPosition[1] = position.coords.longitude;
                vm.zoom = 11;
                vm.map.setCenter(
                    new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude));
                fixtureFactory.getLoading(false);
            }).catch(function(err) {
                fixtureFactory.getLoading(false);
                vm.alertPopup = $ionicPopup.alert({
                    title: 'Aviso!',
                    template: 'Para obter sua posição ative seu GPS e'
                    + 'clique novamente no icone de localização',
                    okType:'button-calm'
                });
            });
        };

        function clearSearch() {
            vm.search = "";
            vm.large = true;
        };

        function zoomIn(bus){
          if(bus.length === 1){
            vm.map.setCenter(
              new google.maps.LatLng(bus[0].Lat, bus[0].Long)
            );
            vm.map.setZoom(15);
          }
        };
    };
})();
