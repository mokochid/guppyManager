'use strict';
angular.module('guppyMenagerApp').
controller('FishListCtrl', function FishListCtrl($scope, userData, $rootScope, aquariumData){
toastr.options = {
  "debug": false,
  "positionClass": "toast-bottom-full-width",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 5000,
  "extendedTimeOut": 1000
};

//  var getAquariumList = function () {
      userData.getDataByURL($rootScope.user.data._links.aquariums.href).
        success(function (data) {
          $scope.aquariums = data._embedded.aquariums;
      }).error(function (data, cos2) {
        toastr.warning("zle dane");
      });
//  };

  var getFishList = function (aquarium) {
    userData.getDataByURL (aquarium._links.aquariumFishes.href).
    success(function (data) {
      console.log(data);
      aquarium.fishes = data._embedded.fishes;
      $scope.aquarium = aquarium;
      console.log(aquarium.fishes);
    }).error(function (data) {
      toastr.error('Bad fishes');
    });
  };
  $scope.getFishes = getFishList;


  $scope.newFishData = {
    "firstName": "",
    "lastName": "",
    "fishTank": null
    };

  $scope.addFish = function (aquarium) {
      $scope.newFishData.fishTank = aquarium._links.self.href;
      aquariumData.createFishInAquarium($scope.newFishData).
        success(function (data) {
          toastr.success("new fish added");
          getFishList(aquarium);
          $scope.newFishData.firstName = "";
          $scope.newFishData.lastName = "";
          $scope.newFishData.fishTank = null;
//          getAquariumList();
    }).error(function (data) {
          toastr.error("error adding aa fish");
    });
//    getAquariumList();
    };
});
