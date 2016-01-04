'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

// Project authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.project.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {
  req.body.permissions = req.body.permissions || ['authenticated'];

  for (var i = 0; i < req.body.permissions.length; i++) {
    var permission = req.body.permissions[i];
    if (req.acl.user.allowed.indexOf(permission) === -1) {
      return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
    }
  }

  next();
};

var retrieveProject = function(req, res, next) {
  Project.findOne({ slug: req.params.projectSlug }, function(err, project) {
    if (err) {
      next(err)
    } else if (project) {
      req.project = project;
      req.params.id = project._id;
      next();
    } else {
      return res.status(404).json({error: 'Project not found'});
    }
  });
};

module.exports = function(Projects, app, auth) {

  var projects = require('../controllers/projects')(Projects);

  app.route('/api/projects')
    .get(projects.all)
    .post(auth.requiresLogin, hasPermissions, projects.create);

  app.route('/api/projects/:projectSlug')
    .get(retrieveProject, projects.show);

  app.route('/api/projects/:projectSlug')
    .put(retrieveProject, auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, projects.update);

  app.route('/api/projects/:projectId')
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, projects.destroy);

  // Finish with setting up the projectId param
  app.param('projectId', projects.project);
};
