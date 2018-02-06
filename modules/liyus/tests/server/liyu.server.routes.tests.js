'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Liyu = mongoose.model('Liyu'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  liyu;

/**
 * Liyu routes tests
 */
describe('Liyu CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Liyu
    user.save(function () {
      liyu = {
        name: 'Liyu name'
      };

      done();
    });
  });

  it('should be able to save a Liyu if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Liyu
        agent.post('/api/liyus')
          .send(liyu)
          .expect(200)
          .end(function (liyuSaveErr, liyuSaveRes) {
            // Handle Liyu save error
            if (liyuSaveErr) {
              return done(liyuSaveErr);
            }

            // Get a list of Liyus
            agent.get('/api/liyus')
              .end(function (liyusGetErr, liyusGetRes) {
                // Handle Liyus save error
                if (liyusGetErr) {
                  return done(liyusGetErr);
                }

                // Get Liyus list
                var liyus = liyusGetRes.body;

                // Set assertions
                (liyus[0].user._id).should.equal(userId);
                (liyus[0].name).should.match('Liyu name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Liyu if not logged in', function (done) {
    agent.post('/api/liyus')
      .send(liyu)
      .expect(403)
      .end(function (liyuSaveErr, liyuSaveRes) {
        // Call the assertion callback
        done(liyuSaveErr);
      });
  });

  it('should not be able to save an Liyu if no name is provided', function (done) {
    // Invalidate name field
    liyu.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Liyu
        agent.post('/api/liyus')
          .send(liyu)
          .expect(400)
          .end(function (liyuSaveErr, liyuSaveRes) {
            // Set message assertion
            (liyuSaveRes.body.message).should.match('Please fill Liyu name');

            // Handle Liyu save error
            done(liyuSaveErr);
          });
      });
  });

  it('should be able to update an Liyu if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Liyu
        agent.post('/api/liyus')
          .send(liyu)
          .expect(200)
          .end(function (liyuSaveErr, liyuSaveRes) {
            // Handle Liyu save error
            if (liyuSaveErr) {
              return done(liyuSaveErr);
            }

            // Update Liyu name
            liyu.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Liyu
            agent.put('/api/liyus/' + liyuSaveRes.body._id)
              .send(liyu)
              .expect(200)
              .end(function (liyuUpdateErr, liyuUpdateRes) {
                // Handle Liyu update error
                if (liyuUpdateErr) {
                  return done(liyuUpdateErr);
                }

                // Set assertions
                (liyuUpdateRes.body._id).should.equal(liyuSaveRes.body._id);
                (liyuUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Liyus if not signed in', function (done) {
    // Create new Liyu model instance
    var liyuObj = new Liyu(liyu);

    // Save the liyu
    liyuObj.save(function () {
      // Request Liyus
      request(app).get('/api/liyus')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Liyu if not signed in', function (done) {
    // Create new Liyu model instance
    var liyuObj = new Liyu(liyu);

    // Save the Liyu
    liyuObj.save(function () {
      request(app).get('/api/liyus/' + liyuObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', liyu.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Liyu with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/liyus/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Liyu is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Liyu which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Liyu
    request(app).get('/api/liyus/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Liyu with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Liyu if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Liyu
        agent.post('/api/liyus')
          .send(liyu)
          .expect(200)
          .end(function (liyuSaveErr, liyuSaveRes) {
            // Handle Liyu save error
            if (liyuSaveErr) {
              return done(liyuSaveErr);
            }

            // Delete an existing Liyu
            agent.delete('/api/liyus/' + liyuSaveRes.body._id)
              .send(liyu)
              .expect(200)
              .end(function (liyuDeleteErr, liyuDeleteRes) {
                // Handle liyu error error
                if (liyuDeleteErr) {
                  return done(liyuDeleteErr);
                }

                // Set assertions
                (liyuDeleteRes.body._id).should.equal(liyuSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Liyu if not signed in', function (done) {
    // Set Liyu user
    liyu.user = user;

    // Create new Liyu model instance
    var liyuObj = new Liyu(liyu);

    // Save the Liyu
    liyuObj.save(function () {
      // Try deleting Liyu
      request(app).delete('/api/liyus/' + liyuObj._id)
        .expect(403)
        .end(function (liyuDeleteErr, liyuDeleteRes) {
          // Set message assertion
          (liyuDeleteRes.body.message).should.match('User is not authorized');

          // Handle Liyu error error
          done(liyuDeleteErr);
        });

    });
  });

  it('should be able to get a single Liyu that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Liyu
          agent.post('/api/liyus')
            .send(liyu)
            .expect(200)
            .end(function (liyuSaveErr, liyuSaveRes) {
              // Handle Liyu save error
              if (liyuSaveErr) {
                return done(liyuSaveErr);
              }

              // Set assertions on new Liyu
              (liyuSaveRes.body.name).should.equal(liyu.name);
              should.exist(liyuSaveRes.body.user);
              should.equal(liyuSaveRes.body.user._id, orphanId);

              // force the Liyu to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Liyu
                    agent.get('/api/liyus/' + liyuSaveRes.body._id)
                      .expect(200)
                      .end(function (liyuInfoErr, liyuInfoRes) {
                        // Handle Liyu error
                        if (liyuInfoErr) {
                          return done(liyuInfoErr);
                        }

                        // Set assertions
                        (liyuInfoRes.body._id).should.equal(liyuSaveRes.body._id);
                        (liyuInfoRes.body.name).should.equal(liyu.name);
                        should.equal(liyuInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Liyu.remove().exec(done);
    });
  });
});
