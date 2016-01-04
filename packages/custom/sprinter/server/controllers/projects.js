'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Project = mongoose.model('Project'),
    slug = require('slug'),
    _ = require('lodash');

module.exports = function(Projects) {
  return {
    /**
     * Find project by id
     */
    project: function(req, res, next, id) {
      Project.load(id, function(err, project) {
        if (err) return next(err);
        if (!project) return next(new Error('Failed to load project ' + id));
        req.project = project;
        next();
      });
    },

    /**
     * Create a project
     */
    create: function(req, res) {
      console.log('project req.body : ', req.body);
      var project = new Project(req.body);
      project.author = req.user;
      project.slug = slug(project.name).toLowerCase();

      project.save(function(err) {
        if (err) {
          switch (err.code) {
            case 11000:
            case 11001:
            res.status(400).json([{
              msg: 'Project name already taken',
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

        res.json(project);
      });
    },

    /**
     * Update a project
     */
    update: function(req, res) {
      var project = req.project;

      project = _.extend(project, req.body);

      project.save(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot update the project'
          });
        }

        res.json(project);
      });
    },

    /**
     * Delete a project
     */
    destroy: function(req, res) {
      var project = req.project;

      project.remove(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot delete the project'
          });
        }

        res.json(project);
      });
    },

    /**
     * Show a project
     */
    show: function(req, res) {
      res.json(req.project);
    },

    /**
     * List of Projects
     */
    all: function(req, res) {
      var query = req.acl.query('Project');

      query.find({}).sort('-created').populate('author', 'name username').exec(function(err, projects) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the projects'
          });
        }

        res.json(projects);
      });
    }
  };
};
