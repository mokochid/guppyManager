/**
 * Created by dm on 11.09.2016.
 */
'use strict';

/**
 * Created by dm on 11.09.2016.
 */
angular.module('guppyMenagerApp')
  .factory('aquariumData', function ($http) {
    var backendURL = 'http://localhost:8080/api/';
    var aquariumURL = backendURL + 'aquariums/';
    var fishURL = backendURL + 'fishes/';
    return {
      getAquariumData: function (aquariumUrl) {
        return $http({method: 'GET', url: aquariumUrl});
      },
      updateAquarium: function (aquarium) {
        return $http({method: 'PUT', url: aquarium._links.self.href, data: aquarium});
      },
      createAquarium: function (data) {
        return $http({method: 'POST', url: aquariumURL, data: data});
      },
      deleteAquarium: function (aquarium) {
        return $http({method: 'DELETE', url: aquarium._links.self.href});
      },
      getAquariums: function () {
        return $http({method: 'GET', url: aquariumURL});
      },
      createFishInAquarium: function (data) {
        return $http({method: 'POST', url: fishURL, data: data});
      }
    };
  });
