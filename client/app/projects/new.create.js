'use strict';

angular.module('opendesignboardApp')
  .controller('ProjectNewCreateCtrl', function ($scope, $stateParams) {
    $scope.owner = $stateParams.owner;
    $scope.repo = $stateParams.repo;
  });
