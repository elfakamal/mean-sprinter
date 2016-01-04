'use strict';

//Articles service used for sprints REST endpoint
angular.module('mean.sprinter')

  .factory('Sprint',
          ['$resource',
  function( $resource ) {
    return $resource('api/projects/:projectId/sprints/:sprintId', { sprintId: '@_id' }, {
      update: { method: 'PUT' }
    });
  }
]);
