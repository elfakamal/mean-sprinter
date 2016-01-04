'use strict';

/* jshint -W098 */
angular.module('mean.sprinter.projects').controller('ProjectController',
                   [ '$q', '$scope', '$stateParams', '$timeout', 'moment', 'Project', 'Sprint', controller] );
function controller(  $q ,  $scope ,  $stateParams ,  $timeout ,  moment ,  Project ,  Sprint ) {
  $scope.dashboard  = {};
  $scope.sprints    = [];
  $scope.sandbox    = [];
  $scope.backlog    = [];

  $scope.newSprint = {};
  $scope.sprints = [];

  var watchinterval = function() {
    $scope.isIntervalValid = moment($scope.newSprint.from).isBefore(moment($scope.newSprint.until));
  };

  $scope.$watch('newSprint.from', watchinterval);
  $scope.$watch('newSprint.until', watchinterval);

  $scope.project = Project.read({ projectSlug: $stateParams.projectSlug });

  $scope.all = function() {
    $scope.newSprint = {};
    Sprint.query(function(sprints) {
      $scope.sprints = sprints;
    });
  };

  $scope.clickState = function() {
    var deferred = $q.defer();
    console.log('clickState');
    $timeout(function() {
      deferred.reject();
    }, 3000);
    return deferred.promise;
  };

  $scope.loadingState = function() {
    console.log('loadingState');
  };

  $scope.completeState = function() {
    console.log('completeState');
  };

  $scope.errorState = function() {
    console.log('errorState');
  };


  $scope.create = function() {
    var sprint = new Sprint($scope.newSprint);
    sprint.$save({projectId: $stateParams.projectId}, $scope.all);
  };

  $scope.changeName = function() {
    $scope.project.name = 'Project one';
    $scope.project.$update({projectSlug: $stateParams.projectSlug}, $scope.all);
  }

  $scope.remove = function(sprint) {
    if(typeof sprint !== 'undefined' && typeof sprint._id !== 'undefined') {
      sprint.$remove($scope.all);
    }
  };
}
