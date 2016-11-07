/**
 * Created by dm on 17.09.2016.
 */
'use strict';
angular.module('guppyMenagerApp').
controller('AquariumListCtrl', function AquariumListCtrl($scope, userData, $rootScope, aquariumData){
  var getAquariumList = function () {
      userData.getDataByURL($rootScope.user.data._links.aquariums.href).
        success(function (data) {
          $scope.aquariums = data._embedded.aquariums;
      }).error(function (data, cos2) {
        alert("zle dane");
      });
  };
  getAquariumList();

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
   "name": "",
   "description": "",
   "user": $rootScope.user.data._links.self.href
  };

  $scope.addAquarium = function () {
    aquariumData.createAquarium($scope.newAquariumData).
      success(function (data) {
        alert("new aquarium added");
        getAquariumList();
  }).error(function (data) {
        alert("error adding an aquarium");
  });
  };

  $scope.editAquarium = function (aquarium) {
    $scope.aquaEdit = angular.copy(aquarium);
  };

  $scope.updateAquarium = function () {
    aquariumData.updateAquarium($scope.aquaEdit).
    success(function(data){
        getAquariumList();
    });
  };

  $scope.removeAquarium = function (aquarium) {
      $scope.aquaDelete = aquarium;
    };

  $scope.deleteAquarium = function () {
    aquariumData.deleteAquarium($scope.aquaDelete).
    success(function(data) {
        getAquariumList();
    });
  };


})