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
      .when('/adminpanel', {
        templateUrl: 'views/adminPanel.html',
        controller: 'AdminPanelCtrl',
        controllerAs: 'apc'
      });
//      .otherwise({
//        redirectTo: '/'
//      });
//    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  })
  .run(function ($http, $rootScope, userData, $location) {
  toastr.options = {
    "debug": false,
    "positionClass": "toast-bottom-full-width",
    "onclick": null,
    "fadeIn": 300,
    "fadeOut": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000
  };
    $http.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $rootScope.isActive = function (viewLocation) {
         var active = (viewLocation === $location.path());
         return active;
    };
    $rootScope.$on('$routeChangeStart', function (event, routeObject) {
      if (!$rootScope.user) {
        console.log('DENY');
        console.log(event);
        if (routeObject.originalPath != '/userlogin') {
           console.log('TEST1');
          event.preventDefault();
         console.log('TEST2');
          $location.path('/userlogin');
          console.log('TEST3');
        }
//        $location.path('/userlogin');
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
                        $http.defaults.headers.common["Authorization"] = "Basic " + btoa(login + ":" + password);
                        userData.findByLogin(login).success(function (data) {
                                $rootScope.user = {"login": login, "password": password};
                                $rootScope.user.data = data;
                                //$http.defaults.withCredentials = true;
                                //$http.defaults.headers.common["Authorization"] = "Basic " + btoa(login + ":" + password);
                                $location.path('/aquariumlist');
                                toastr.success('Login success')
                                //todo:daniel ladna obsluga bledow nie przez alerty tylko przez angularowe monity alert("findbylogin success");
                              }).error(function () {
                                toastr.error("Nie znaleziono użytkownika");
                              });
                      } else {
                        alert("Błędne dane logowania");
                      }
                      $rootScope.authenticatedadmin = false;
                      response.data.authorities.forEach(function (authObject) {
                        if(authObject.authority == "ADMIN")
                        $rootScope.authenticatedadmin = true;
                      })


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