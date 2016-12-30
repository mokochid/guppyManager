/**
 * Created by dm on 17.09.2016.
 */
'use strict';
angular.module('guppyMenagerApp').
controller('AquariumListCtrl', function AquariumListCtrl($scope, userData, $rootScope, aquariumData){
toastr.options = {
  "debug": false,
  "positionClass": "toast-bottom-full-width",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 5000,
  "extendedTimeOut": 1000
};
  $scope.fishBirth = $rootScope.user.birthFishes;

  var getAquariumList = function () {
      userData.getDataByURL($rootScope.user.data._links.aquariums.href).
        success(function (data) {
          $scope.aquariums = data._embedded.aquariums;
      }).error(function (data, cos2) {
        toastr.warning("zle dane");
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
      toastr.error('Bad fishes');
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
        toastr.success("new aquarium added");
        getAquariumList();
  }).error(function (data) {
        toastr.error("error adding an aquarium");
  });
  getAquariumList();
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