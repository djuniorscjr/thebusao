(function() {
    'use strict';
    angular.module('thebusao')
        .factory('mapFactory', mapFactory);

    mapFactory.$inject = ['URL', '$http', 'fixtureFactory', '$timeout'];

    function mapFactory(URL, $http, fixtureFactory, $timeout){

        return {
            getLines: getLines,
            getVehicles: getVehicles
        };

        function getLines(search) {
            var vm = this;
            var param = search != undefined ? search : "";
            return $http.get(URL + "/v1/lines/" + param)
                .then(getLinesSuccefuly)
                .catch(getLinesFailed);

            function getLinesSuccefuly(response) {
                return response.data.result;
            };

            function getLinesFailed(error) {
                if(error.data != null && error.data.err === "Token expirado"){
                    fixtureFactory.getTokenValidRequest().then(function(data){
                        vm.getLines();
                    });
                }
            };

        };

        function getVehicles(code) {
            var vm = this;
            var param = code != undefined ? code : "";
            return $http.get(URL + "/v1/vehicles/" + param)
                .then(getVehiclesSuccefuly)
                .catch(getVehiclesFailed);

            function getVehiclesSuccefuly(response) {
                return response.data.result;
            };

            function getVehiclesFailed(error) {
                if(error.data != null && error.data.err === "Token expirado"){
                    fixtureFactory.getTokenValidRequest().then(function(data){
                        vm.getVehicles();
                    });
                }
            };
        };
   };
})();


