'use strict';

/**
 * Created by dm on 11.09.2016.
 */
angular.module('guppyMenagerApp')
.factory('userData', function ($http) {
  var backendURL = 'http://localhost:8080/api/users/';
  return {
    getData: function (dataUrl) {
      return $http({method: 'GET', url: dataUrl});
    },
    updateUser: function (user) {
      return $http({method: 'PUT', url: user._links.self.href, data: user});
    },
    createUser: function (userData) {
      return $http({method: 'POST', url: backendURL, data: userData});
    },
    deleteUser: function (user) {
      return $http({method: 'DELETE', url: user._links.self.href});
    },
    getUsers: function () {
      return $http({method: 'GET', url: backendURL});
      },
    getUserAquariums: function (user_id) {
      return $http({method: 'GET', url: backendURL + user_id + '/aquariums' });
    },
    getDataByURL: function (url) {
      return $http({method: 'GET', url: url});
    },
    findByLogin: function (login) {
      return $http({method: 'GET', url: backendURL + "search/findByLogin", params: {login:login}});
    },
    addNewAquarium: function (url, data) {
        return $http({method: 'POST', url: url, data: data});
    }
  };
});
