'use strict';

angular.module('opendesignboardApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, $http) {
    $scope.owner = $stateParams.owner;
    $scope.repo = $stateParams.repo;
    $http.get('/api/project/' + $scope.owner + '/' + $scope.repo).
      success(function(data, status, headers, config) {
        $scope.project = data;
      });
  });
