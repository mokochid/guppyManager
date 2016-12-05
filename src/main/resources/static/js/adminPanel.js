'use strict';
angular.module('guppyMenagerApp').
controller('AdminPanelCtrl', function AdminPanelCtrl($scope, userData, $rootScope){
toastr.options = {
  "debug": false,
  "positionClass": "toast-bottom-full-width",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 5000,
  "extendedTimeOut": 1000
};
$scope.newUserData = {
    "login": "",
    "password": "",
    "roles": []
    };
$scope.addUser = function () {
      $scope.newUserData.roles.push($scope.newUserData.role);
      userData.createUser($scope.newUserData).
        success(function (data) {
          toastr.success("new user added");
          $scope.newUserData.login = "";
          $scope.newUserData.password = "";
          $scope.newUserData.roles = [];
    }).error(function (data) {
          toastr.error("error adding a user");
    });
};
$scope.editUser = function (user) {
    $scope.userEdit = angular.copy(user);
  };
   $scope.updateUser = function () {
      console.log($scope.userEdit);
      $scope.userEdit.roles.push($scope.userEdit.role);
      userData.updateUser($scope.userEdit).
      success(function(data){
        console.log(data);
      });
    };


$scope.getUsers = function () {
    $scope.boolUserList = true;
    userData.getUsers().
            success(function (data) {
              console.log(data);
              $scope.users = data._embedded.users;
          }).error(function (data, cos2) {
            toastr.warning("zle dane");
          });
};
  $scope.removeUser = function (user) {
        $scope.userDelete = user;
      };

  $scope.deleteUser = function () {
    userData.deleteUser($scope.userDelete).
    success(function(data) {
        $scope.getUsers();
    });
  };
  //localhost:8080/api/genes/search/findByGeneTypes?GeneTypes=Autosomal
$scope.newGeneData = {
    "name": "",
    "description": "",
    "geneTypes": ""
    };
$scope.getGenes = function () {
    $scope.boolGeneManager = true;
};
$scope.addGene = function () {
      aquariumData.createGeneForFish($scope.newGeneData).
        success(function (data) {
          toastr.success("new gene added");
          $scope.newGeneData.name = "";
          $scope.newGeneData.description = "";
          $scope.newGeneData.geneTypes = "";
    }).error(function (data) {
          toastr.error("error adding a gene");
    });
};

});
