/* jshint -W079 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose'),
  slug = require('slug'),
  User = mongoose.model('User'),
  Project = mongoose.model('Project');

/**
 * Globals
 */
var author,
    project,
    anotherProject,
    projectName = 'Project name';

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Project:', function() {
    beforeEach(function(done) {
      this.timeout(10000);
      author = new User({
        name: 'author full name',
        email: 'author@example.com',
        username: 'author',
        password: 'password'
      });

      author.save(function() {
        project = new Project({
          name: projectName,
          slug: slug(projectName),
          description: 'Project description',
          sprints: [],
          author: author
        });
        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        this.timeout(10000);

        return project.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.name).to.equal('Project name');
          expect(data.description).to.equal('Project description');
          expect(data.author.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });

      });

      it('should be able to show an error when try to save without name', function(done) {
        this.timeout(10000);
        project.name = '';

        return project.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save a project with existing name', function(done) {
        this.timeout(10000);

        anotherProject = new Project({
          name: projectName,
          slug: slug(projectName),
          description: 'Another project description',
          sprints: [],
          author: author
        });

        return anotherProject.save(function(err) {
          expect(err).to.not.be(undefined);
          anotherProject.remove();
          done();
        });
      });

      it('should be able to show an error when try to save without author', function(done) {
        this.timeout(10000);
        project.author = {};

        return project.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(10000);
      project.remove(function() {
        author.remove(done);
      });
    });
  });
});
