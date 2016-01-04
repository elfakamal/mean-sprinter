'use strict';

// Sprint authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.sprint.user.id !== req.user.id) {
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

module.exports = function(Sprints, app, auth) {
  var sprints = require('../controllers/sprints')(Sprints);

  app.route('/api/projects/:projectSlug/sprints')
    .get(sprints.all)
    .post(auth.requiresLogin, hasAuthorization, sprints.create);

  app.route('/api/projects/:projectSlug/sprints/:sprintId')
    .get(auth.isMongoId, sprints.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, sprints.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, sprints.destroy);

  // Finish with setting up the sprintId param
  app.param('sprintId', sprints.sprint);
};
