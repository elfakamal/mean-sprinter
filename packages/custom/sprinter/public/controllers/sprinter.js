'use strict';

/* jshint -W098 */
angular.module('mean.sprinter').controller('SprinterController',
                  ['$scope', 'MeanUser', 'Project', controller] );
function controller($scope ,  MeanUser ,  Project ) {
  $scope.projects = [];
  $scope.authenticated = MeanUser.loggedin;

  $scope.all = function() {
    $scope.newProject = {};
    Project.query(function(projects) {
      $scope.projects = projects;
    });
  };

  $scope.create = function() {
    if(typeof $scope.newProject.name !== 'undefined') {
      var project = new Project($scope.newProject);
      project.$save($scope.all);
    }
  };

  $scope.remove = function(project) {
    if(typeof project !== 'undefined' && typeof project._id !== 'undefined') {
      project.$remove($scope.all);
    }
  };
}
