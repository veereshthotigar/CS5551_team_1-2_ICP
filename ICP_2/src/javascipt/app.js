(function(){
    "use strict";
    angular.module('forecast', [])
        .controller('forecastController', function($scope, $http) {
            var s = $scope;
            s.bind = {};
            s.flag = false;
            $scope.getWeather = function() {
                s.errorText = '';
                s.results = [];
                s.flag = false;
                var apiUrl = 'https://api.wunderground.com/api/36b799dc821d5836/hourly/q/'+s.bind.state+'/'+s.bind.city+'.json';
                $http.get(apiUrl).success(function(data) {
                    console.log(data);
                    if(data.hourly_forecast){
                        s.flag = true;
                        s.currentRes =data.hourly_forecast[0];
                        s.results = data.hourly_forecast.splice(1,4);
                    }
                   else{
                        s.flag = false;
                        s.errorText = (data.response.error.description ? data.response.error.description : '');
                    }
                })
            }
        });
})();