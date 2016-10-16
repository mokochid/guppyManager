/**
 * @ngdoc overview
 * @name guppyMenagerApp
 * @description
 * # guppyMenagerApp
 *
 * Main module of the application.
 */
angular
  .module('guppyMenagerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/userLogin.html',
        controller: 'UserLoginCtrl',
        controllerAs: 'ul'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/apka', {
        templateUrl: 'views/apka.html',
        controller: 'AppController',
        controllerAs: 'apka'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'userc'
      })
      .when('/aquariumlist', {
        templateUrl: 'views/aquariumList.html',
        controller: 'AquariumListCtrl',
        controllerAs: 'aql'
      })
      .when('/userlogin', {
        templateUrl: 'views/userLogin.html',
        controller: 'UserLoginCtrl',
        controllerAs: 'ul'
      })
      .when('/fishlist', {
        templateUrl: 'views/fishList.html',
        controller: 'FishListCtrl',
        controllerAs: 'flc'
      })
      .otherwise({
        redirectTo: '/userlogin'
      });
//    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  })
  .run(function ($http, $rootScope, userData, $location) {
    $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $rootScope.$on('$routeChangeStart', function (event, routeObject) {
      if (!$rootScope.user) {
        console.log('DENY');
        console.log(event);
        if (routeObject.originalPath != '/userlogin') {
          event.preventDefault();
          $location.path('/userlogin');
        }
      }
      else {
        console.log('ALLOW');
        // $location.path('/home');
      }

    });




    $rootScope.userLogin = function (login, password) {
        var headers = {authorization : "Basic "
                                      + btoa(login + ":" + password)
                                  }
        $http.get('user', {headers : headers}).then(function(response) {
                      if (response.data.name) {
                        $rootScope.user = {"login": login, "password": password};
                        userData.findByLogin(login).success(function (data) {
                                $rootScope.user = {"login": login, "password": password};
                                $rootScope.user.data = data;
                                //$http.defaults.withCredentials = true;
                                //$http.defaults.headers.common["Authorization"] = "Basic " + btoa(login + ":" + password);
                                $location.path('/aquariumlist');
                                alert("findbylogin success");
                              }).error(function () {
                                alert("Nie znaleziono użytkownika");
                              });
                      } else {
                        alert("Nie znaleziono użytkownika");
                      }
                    }, function() {
                      alert("Brak usera");
                    });

      /*userData.findByLogin(login).success(function (data) {
        $rootScope.user = {"login": login, "password": password};
        $rootScope.user.data = data;
        *//*$http.defaults.withCredentials = true;
        $http.defaults.headers.common["Authorization"] = "Basic " + btoa(login + ":" + password);*//*
        $location.path('/aquariumlist');
        alert("findbylogin success");
      }).error(function () {
        alert("Nie znaleziono użytkownika");
      });*/
    };

    $rootScope.userLogout = function () {
      $rootScope.user = null;
      delete $http.defaults.headers.common["Authorization"];

    }
  });
