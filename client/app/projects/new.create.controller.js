'use strict';

angular.module('opendesignboardApp')
  .controller('ProjectNewCreateCtrl', function ($scope, $stateParams, $http) {
    $scope.owner = $stateParams.owner;
    $scope.repo = $stateParams.repo;
    $http.get('/api/github/repo/' + $scope.owner + '/' + $scope.repo + '/check').
      success(function(data, status, headers, config) {
        $scope.repoCheck = data;
      }).error(function(data, status, headers, config) {
        $scope.repoCheck = {};
      });
    $scope.addProject = function() {
      $http.post('/api/project/', {owner: $scope.owner, repo: $scope.repo}).
      success(function(data, status, headers, config) {
        $scope.repoCheck.projectExists = true;
      });
    };
  });
