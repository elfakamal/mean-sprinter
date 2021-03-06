'use strict';

angular.module('mean.sprinter').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('dashboard', { url: '/dashboard', templateUrl: 'sprinter/views/dashboard.html', controller: 'DashboardController' });
    $stateProvider.state('projects',  { url: '/projects', templateUrl: 'sprinter/views/project/index.html', controller: 'SprinterController' });
    $stateProvider.state('project',   { url: '/project/:projectSlug', templateUrl: 'sprinter/views/project.html', controller: 'ProjectController' });
  }
]);
