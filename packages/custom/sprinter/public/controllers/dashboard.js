'use strict';

/* jshint -W098 */
angular.module('mean.sprinter').controller('DashboardController',
                  [ 'MeanUser', controller] );
function controller( MeanUser ) {
  this.authenticated = MeanUser.loggedin;
  this.dummy = {
    key1: 'value1',
    key2: 'value2'
  };
}
