'use strict';

angular.module('opendesignboardApp')
  .controller('ProjectNewCreateCtrl', function ($scope, $stateParams, $http) {
    $scope.owner = $stateParams.owner;
    $scope.repo = $stateParams.repo;
    $http.get('/api/github/repo/' + $scope.owner + '/' + $scope.repo + '/readme').
      success(function(data, status, headers, config) {
        $scope.readme = data.readme;
      });
  });
