'use strict';

angular.module('opendesignboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('projects.index', {
        url: '',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsCtrl'
      })
      .state('projects.new', {
        url: '/new',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('projects.new.list', {
        url: '',
        templateUrl: 'app/projects/new.list.html',
        controller: 'ProjectNewListCtrl'
      })
      .state('projects.new.create', {
        url: '/:owner/:repo',
        templateUrl: 'app/projects/new.create.html',
        controller: 'ProjectNewCreateCtrl'
      });
  });