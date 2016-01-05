'use strict';

/**
 * Overriding public views: header
 */
angular.module('mean.sprinter', ['mean.system']).config(['$viewPathProvider', function($viewPathProvider) {
  //system
  $viewPathProvider.override('system/views/index.html', 'sprinter/views/index.html');
  $viewPathProvider.override('system/views/header.html', 'sprinter/views/header.html');

  //users
  $viewPathProvider.override('users/views/index.html', 'sprinter/views/users/index.html');
  $viewPathProvider.override('users/views/login.html', 'sprinter/views/users/login.html');
  $viewPathProvider.override('users/views/register.html', 'sprinter/views/users/register.html');
  $viewPathProvider.override('users/views/forgot-password.html', 'sprinter/views/users/forgot-password.html');
}]);

angular.module('mean.sprinter.projects', []);
angular.module('mean.sprinter.teams',    []);
angular.module('mean.sprinter.sprints',  []);
angular.module('mean.sprinter.stories',  []);
angular.module('mean.sprinter.todos',    []);
