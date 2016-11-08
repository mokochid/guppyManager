/**
 * Created by dm on 17.09.2016.
 */
'use strict';
angular.module('guppyMenagerApp').
controller('UserLoginCtrl', function UserLoginCtrl($scope, $rootScope){
  $scope.loginOnClick = function () {
    if($scope.login && $scope.password) {
      $rootScope.userLogin($scope.login, $scope.password);
    }else {
      toastr.warning('Login and password needed to login successfully')
    }
    /*console.log($rootScope.user);
    console.log($scope.login);
    console.log(login);*/
  };

});
