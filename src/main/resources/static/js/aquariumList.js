/**
 * Created by dm on 17.09.2016.
 */
'use strict';
angular.module('guppyMenagerApp').
controller('AquariumListCtrl', function AquariumListCtrl($scope, userData, $rootScope){
  /*userData.getData($scope.user._links.aquariums.href).
  success(function (data) {
    $scope.aquariums = data._embedded.aquariums;
  }).error(function (data) {
    alert("zle dane");
  });*/
  $scope.aquariumBool = true;
  userData.getDataByURL($rootScope.user.data._links.aquariums.href).
    success(function (data) {
      $scope.aquariums = data._embedded.aquariums;
  }).error(function (data, cos2) {
    console.log(data);
    console.log(cos2);
    alert("zle dane");
  });
//    $scope.aquariums = $rootScope.user.data.aquariums;

  $scope.getFishes = function (aquarium) {
    userData.getDataByURL (aquarium._links.aquariumFishes.href).
    success(function (data) {
      aquarium.fishes = data._embedded.fishes;
      aquarium.aquariumFishesVisible = true;
      console.log(aquarium.fishes);
    }).error(function (data) {
      alert("zle ryby");
    });

  };

});
