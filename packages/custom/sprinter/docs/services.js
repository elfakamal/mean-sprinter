'use strict';

exports.load = function(swagger, params) {
  var projectList = {
    spec: {
      description: 'Project operations',
      path: '/projects',
      method: 'GET',
      summary: 'Get all Projects',
      notes: '',
      type: 'Project',
      nickname: 'getProjects',
      produces: ['application/json']
    }
  };

  var createProject = {
    spec: {
      description: 'Project operations',
      path: '/projects',
      method: 'POST',
      summary: 'Create project',
      notes: '',
      type: 'Project',
      nickname: 'createProject',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Project to create. User will be inferred by the authenticated user.',
        required: true,
        type: 'Project',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  var sprintList = {
    spec: {
      description: 'Sprint operations',
      path: '/projects/:project_id/sprints',
      method: 'GET',
      summary: 'Get a project\'s sprint list',
      notes: '',
      type: 'Sprint',
      nickname: 'getSprints',
      produces: ['application/json']
    }
  };

  var createSprint = {
    spec: {
      description: 'Sprint operations',
      path: '/projects/:project_id/sprints',
      method: 'POST',
      summary: 'CReate a sprint in a given project',
      notes: '',
      type: 'Sprint',
      nickname: 'createSprint',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Sprint to create. User will be inferred by the authenticated user.',
        required: true,
        type: 'Sprint',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger
    //project
    .addGet(projectList)
    .addPost(createProject)

    //sprint
    .addGet(sprintList)
    .addPost(createSprint);
  };
