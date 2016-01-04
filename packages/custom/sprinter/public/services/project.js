'use strict';

//Project service used for projects REST endpoint
angular.module('mean.sprinter')

  .factory('Project',
          ['$resource',
  function( $resource ) {
    return $resource('api/projects/:projectSlug', { projectSlug: '@slug' }, {
      read: { method: 'GET', isArray: false },
      update: { method: 'PUT' }
    });
  }
]);
