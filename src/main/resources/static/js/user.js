'use strict';
angular.module('guppyMenagerApp').
controller('UserCtrl', function UserCtrl($scope, $rootScope, userData){
  $scope.user = $rootScope.user;
  console.log("dupa");
  console.log($scope.user);
  userData.getData($scope.user._links.aquariums.href).
    success(function (data) {
      $scope.aquariums = data._embedded.aquariums;
  }).error(function (data) {
    alert("zle dane");
  });
});
