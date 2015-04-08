'use strict';

angular.module('opendesignboardApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $state) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.$state = $state;
    $scope.avatar_url = function(size) {
      if(!Auth.isLoggedIn()) return null;
      return Auth.getCurrentUser().github.avatar_url + "&size=" + size;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });