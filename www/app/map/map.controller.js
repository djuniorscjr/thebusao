(function() {
    'use strict';
    angular.module('thebusao')
        .controller('mapController', mapController);

    mapController.$inject = ['fixtureFactory', 'mapFactory', '$scope', '$timeout'];

    function mapController(fixtureFactory, mapFactory, $scope, $timeout){
        var vm = this;
        vm.busAll = [];
        vm.linesAll = [];
        getToken();

        $timeout(function(){
            getVehicles();
            getLines();
        }, 2000);

        function getToken() {
            fixtureFactory.getTokenValidRequest();
        };

        function getVehicles() {
            return mapFactory.getVehicles(vm.code)
                .then(function(data){
                    vm.busAll = data;
                    return vm.busAll;
            });
        };

        function getLines() {
            return mapFactory.getLines(vm.search)
                .then(function(data){
                    vm.linesAll = data;
                    console.log(data);
                    return vm.linesAll;
            });
        };
    };

})();

