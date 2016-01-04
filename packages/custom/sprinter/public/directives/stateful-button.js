'use strict';

+(function() {
  'use strict';

  angular.module('mean.sprinter').directive('statefulButton', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        clickState: '&',
        loadingState: '&',
        completeState: '&',
        errorState: '&'
      },
      link: function($scope, $element, $attrs) {
        if(typeof $scope.clickState !== 'undefined') {
          $scope.resetDelay = $scope.resetDelay || 2e4;

          var reset = function() {
            $timeout(function() {
              $element.button('reset');
            }, $scope.resetDelay);
          };

          $element.on('click', function() {
            $element.button('loading');

            if(typeof $scope.loadingState !== 'undefined') {
              $scope.loadingState();
            }

            $scope.clickState().then(function() {
              if(typeof $scope.completeState !== 'undefined') {
                $scope.completeState();
                $element.button('complete');
              }

              reset();
            }, function() {
              if(typeof $scope.errorState !== 'undefined') {
                $scope.errorState();
                $element.button('error');
                $element.find('span')[0].style.top = '-30px';
              }

              reset();
            });
          });
        }
      }
    };
  }]);
})();
