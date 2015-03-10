'use strict';

angular.module('opendesignboardApp')
  .controller('NewProjectCtrl', function ($scope, $http, Auth) {
    var githubLogin = Auth.getCurrentUser().github.login;
    $scope.githubLogin = githubLogin;
    $scope.repos = {};
    $scope.updateAccount = function(account) {
      var accountType = (account == githubLogin) ? 'user' : 'org';
      $scope.account = account;
      $scope.accountType = accountType;
      if(!$scope.repos[account]) {
        if(accountType == 'user') {
          $http.get('/api/github/user/repos').
            success(function(data, status, headers, config) {
              $scope.repos[githubLogin] = data;
            });
        } else if(accountType == 'org') {
          $http.get('/api/github/orgs/' +  account + '/repos').
            success(function(data, status, headers, config) {
              $scope.repos[account] = data;
            });
        }
      }
    };
    $http.get('/api/github/user/orgs').
      success(function(data, status, headers, config) {
        $scope.orgs = data;
      });
    $scope.updateAccount(githubLogin);
  });
