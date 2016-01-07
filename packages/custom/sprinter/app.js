'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
    express = require('express'),
    config = require('meanio').loadConfig(),
    Sprinter = new Module('sprinter');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Sprinter.register(function(app, auth, database, circles, swagger) {

  app.set('views', __dirname + '/server/views');

  //We enable routing. By default the Package Object is passed to the routes
  Sprinter.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users.
  //The link refers to angular route state.
  Sprinter.menus.add({
    title: 'Projects',
    link: 'projects',
    roles: ['anonymous'],
    menu: 'main'
  });
  Sprinter.menus.add({
    title: 'Teams',
    link: 'teams',
    roles: ['anonymous'],
    menu: 'main'
  });
  Sprinter.menus.add({
    title: 'Dashboard',
    link: 'dashboard',
    roles: ['authenticated'],
    menu: 'main'
  });

  // Sprinter.menus.add({
  //   title: 'Sandbox',
  //   link: 'sandbox',
  //   roles: ['authenticated'],
  //   menu: 'main'
  // });

  // Sprinter.menus.add({
  //   title: 'Backlog',
  //   link: 'backlog',
  //   roles: ['authenticated'],
  //   menu: 'main'
  // });

  Sprinter.angularDependencies(['mgcrea.ngStrap', 'angularMoment', 'mean.circles', 'mean.sprinter']);
  Sprinter.aggregateAsset('css', 'sprinter-app.css');
  Sprinter.aggregateAsset('css', 'https://fonts.googleapis.com/css?family=Lato:400,700,900,300,100,700italic,400italic,300italic,100italic,900italic', {url: true});

  // app.use('/files/public', express.static(config.root + '/packages/sprinter/assets/upload'));

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Sprinter.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Sprinter.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Sprinter.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);

  return Sprinter;
});
