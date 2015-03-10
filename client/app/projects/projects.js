'use strict';

angular.module('opendesignboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsCtrl'
      })
      .state('projects.new', {
        url: '/new',
        templateUrl: 'app/projects/new.html',
        controller: 'NewProjectCtrl'
      });
  });