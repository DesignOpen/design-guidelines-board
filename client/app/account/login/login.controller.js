'use strict';

angular.module('opendesignboardApp')
  .controller('LoginCtrl', function ($scope, $window) {
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
