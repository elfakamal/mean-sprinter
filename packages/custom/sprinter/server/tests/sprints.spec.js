/* jshint -W079 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Project = mongoose.model('Project'),
  Sprint = mongoose.model('Sprint');

/**
 * Globals
 */
var author,
    project,
    sprint,
    anotherSprint;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Sprint:', function() {
    beforeEach(function(done) {
      this.timeout(2000);

      author = new User({
        name: 'author full name',
        email: 'author@example.com',
        username: 'author',
        password: 'password'
      });

      project = new Project({
        name: 'Project for test',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, ipsam, dolore. Tenetur sequi beatae, nihil dolorem enim facere quidem mollitia quisquam reiciendis nam! Quod laboriosam recusandae porro obcaecati, vero eos.',
        author: author
      });

      author.save(function() {
        project.save(function() {
          sprint = new Sprint({
            name: 'Sprint name',
            description: 'Sprint description',
            from: new Date(),
            until: new Date(2017, 1, 1),
            author: author,
            project: project
          });
          done();
        });
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        this.timeout(2000);
        return sprint.save(function(err, data) {
          expect(err).to.be(null);

          expect(data.name).to.equal('Sprint name');
          expect(data.description).to.equal('Sprint description');
          expect(data.author.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });
      });

      it('should be able to show an error when try to save without name', function(done) {
        this.timeout(2000);
        sprint.name = '';

        return sprint.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to show an error when try to save without author', function(done) {
        this.timeout(2000);
        sprint.author = {};

        return sprint.save(function(err) {
          expect(err).to.not.be(undefined);
          done();
        });
      });

      it('should be able to save without description', function(done) {
        this.timeout(2000);
        delete sprint.description;

        return sprint.save(function(err) {
          expect(err).to.be(null);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(2000);
      sprint.remove(function() {
        author.remove(done);
      });
    });
  });
});
