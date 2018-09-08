(function(){
    "use strict";
    angular.module('fitnessApp', ['ngSanitize','ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'home'
                })
                .otherwise({
                    templateUrl: 'views/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'home'
                });
        })
        .controller('homeCtrl', function($scope, $http) {
            var s = $scope;
            s.bind = {};
            s.bind.searchText;
            s.flag = false;
            s.getCalories = function() {
                s.errorText = '';
                s.results = {};
                s.flag = false;
                if(!s.bind.searchText){
                    s.flag = false;
                    s.errorText = 'Search cannot be empty.';
                    return ;
                }
                var apiUrl = 'https://api.nutritionix.com/v1_1/search/'+s.bind.searchText+'?' +
                    'results=0:1&fields=*&appId='+config.appId+'&' +
                    'appKey='+config.appKey;
                $http.get(apiUrl).then(function(response) {
                    if(response.data.total_hits > 0){
                        s.flag = true;
                        s.results = response.data.hits;
                    }
                    else{
                        s.flag = false;
                        s.errorText = 'Couldn\'t able to find the results for the searched keyword.';
                    }
                }, function(error){
                    s.flag = false;
                    s.errorText = error;
                });
            };

        })
        .controller('childCtrl', function($scope) {
            var s = $scope;
            s.getSpeech = function () {
                var watsonUrl = 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?' +
                    'username='+config.username+'' +
                    '&password='+config.password+'&text='+s.bind.searchText;
                var media = new Audio(watsonUrl);
                media.play();
            }
        });
})();