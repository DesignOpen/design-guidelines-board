'use strict';

angular.module('opendesignboardApp')
  .controller('ProjectsCtrl', function ($scope, $http) {
    $http.get('/api/project').
      success(function(data, status, headers, config) {
        $scope.projects = data;
      });
  });
