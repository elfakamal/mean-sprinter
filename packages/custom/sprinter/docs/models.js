exports.models = {
  Project: {
    id: 'Project',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        description: 'Name of the project'
      },
      slug: {
        type: 'string',
        description: 'Slug of the project'
      },
      description: {
        type: 'string',
        description: 'Description of the project'
      },
      author: {
        type: 'Object',
        description: 'Author of the project'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the project'
      }
    }
  },

  Sprint: {
    id: 'Sprint',
    required: ['name', 'from', 'until'],
    properties: {
      from: {
        type: 'Date',
        description: 'Day when the sprint begins'
      },
      until: {
        type: 'Date',
        description: 'Day when the sprint ends'
      },
      name: {
        type: 'String',
        description: 'Name of the sprint'
      },
      slug: {
        type: 'String',
        description: 'Name\'s slug of the sprint'
      },
      description: {
        type: 'string',
        description: 'Description of the sprint'
      },
      active: {
        type: 'boolean',
        description: 'Is the sprint active'
      },
      project: {
        type: 'Object',
        description: 'Project to which the sprint belong'
      },
      author: {
        type: 'Object',
        description: 'Creator of the sprint'
      }
    }
  }
};
