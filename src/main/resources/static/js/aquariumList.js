/**
 * Created by dm on 17.09.2016.
 */
'use strict';
angular.module('guppyMenagerApp').
controller('AquariumListCtrl', function AquariumListCtrl($scope, userData, $rootScope, aquariumData){
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

   $scope.newAquariumData = {
       "name": "dupa",
       "description": "",
       "user": $rootScope.user.data._links.self.href
   }
  $scope.addAquarium = function () {
  console.log($scope);
  aquariumData.createAquarium($scope.newAquariumData).
  success(function (data) {
    console.log(data);
    alert("new aquarium added");
  }).error(function (data) {
      console.log(data);
      alert("error adding an aquarium");
  });
  };

});
