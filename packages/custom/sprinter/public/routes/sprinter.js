'use strict';

angular.module('mean.sprinter').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('dashboard', { url: '/dashboard', templateUrl: 'sprinter/views/dashboard.html', controller: 'DashboardController' });
    $stateProvider.state('project',   { url: '/project/:projectSlug', templateUrl: 'sprinter/views/project.html', controller: 'ProjectController' });
  }
]);
