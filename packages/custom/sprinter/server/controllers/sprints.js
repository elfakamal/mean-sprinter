'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Sprint = mongoose.model('Sprint'),
    _ = require('lodash');

module.exports = function(Sprints) {
  return {
    /**
     * Find sprint by id
     */
    sprint: function(req, res, next, id) {
      Sprint.load(id, function(err, sprint) {
        if (err) return next(err);
        if (!sprint) return next(new Error('Failed to load sprint ' + id));
        req.sprint = sprint;
        next();
      });
    },

    /**
     * Create an sprint
     */
    create: function(req, res) {
      var sprint = new Sprint(req.body);
      sprint.author = req.user;

      console.log('sport id: ');

      sprint.save(function(err) {
        if (err) {
          switch (err.code) {
            case 11000:
            case 11001:
            res.status(400).json([{
              msg: 'Sprint name already taken',
              param: 'name'
            }]);
            break;
            default:
            var modelErrors = [];

            if (err.errors) {

              for (var x in err.errors) {
                modelErrors.push({
                  param: x,
                  msg: err.errors[x].message,
                  value: err.errors[x].value
                });
              }

              res.status(400).json(modelErrors);
            }
          }
          return res.status(400);
        }

        res.json(sprint);
      });
    },

    /**
     * Update an sprint
     */
    update: function(req, res) {
      var sprint = req.sprint;

      sprint = _.extend(sprint, req.body);

      sprint.save(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot update the sprint'
          });
        }

        res.json(sprint);
      });
    },

    /**
     * Delete an sprint
     */
    destroy: function(req, res) {
      var sprint = req.sprint;

      sprint.remove(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot delete the sprint'
          });
        }

        res.json(sprint);
      });
    },

    /**
     * Show an sprint
     */
    show: function(req, res) {
      res.json(req.sprint);
    },

    /**
     * List of Articles
     */
    all: function(req, res) {
      var query = req.acl.query('Project');

      var sprints = query.find({}).sort('-created').populate('author', 'name username').exec(function(err, projects) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the sprints'
          });
        }

        res.json(sprints);
      });
    }
  }
};
