/**
 * Created by dm on 11.09.2016.
 */
'use strict';

/**
 * Created by dm on 11.09.2016.
 */
angular.module('guppyMenagerApp')
  .factory('aquariumData', function ($http) {
    var backendURL = 'http://localhost:8080/api/aquariums/';
    return {
      getAquariumData: function (aquariumUrl) {
        return $http({method: 'GET', url: aquariumUrl});
      },
      updateAquarium: function (aquarium_id, aquariumData) {
        return $http({method: 'PUT', url: backendURL + 'aquarium_id', data: {aquariumData: aquariumData}, params: {aquarium_id: aquarium_id} });
      },
      createAquarium: function (data) {
        return $http({method: 'POST', url: backendURL, data: data});
      },
      deleteAquarium: function (aquarium_id) {
        return $http({method: 'GET', url: backendURL + 'aquarium_id', params: {aquarium_id: aquarium_id}});
      },
      getAquariums: function () {
        return $http({method: 'GET', url: backendURL});
      }
    };
  });
