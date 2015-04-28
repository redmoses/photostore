'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Moment = mongoose.model('Moment'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, moment;

/**
 * Moment routes tests
 */
describe('Moment CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
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

		// Save a user to the test db and create new Moment
		user.save(function() {
			moment = {
				name: 'Moment Name'
			};

			done();
		});
	});

	it('should be able to save Moment instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Moment
				agent.post('/moments')
					.send(moment)
					.expect(200)
					.end(function(momentSaveErr, momentSaveRes) {
						// Handle Moment save error
						if (momentSaveErr) done(momentSaveErr);

						// Get a list of Moments
						agent.get('/moments')
							.end(function(momentsGetErr, momentsGetRes) {
								// Handle Moment save error
								if (momentsGetErr) done(momentsGetErr);

								// Get Moments list
								var moments = momentsGetRes.body;

								// Set assertions
								(moments[0].user._id).should.equal(userId);
								(moments[0].name).should.match('Moment Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Moment instance if not logged in', function(done) {
		agent.post('/moments')
			.send(moment)
			.expect(401)
			.end(function(momentSaveErr, momentSaveRes) {
				// Call the assertion callback
				done(momentSaveErr);
			});
	});

	it('should not be able to save Moment instance if no name is provided', function(done) {
		// Invalidate name field
		moment.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Moment
				agent.post('/moments')
					.send(moment)
					.expect(400)
					.end(function(momentSaveErr, momentSaveRes) {
						// Set message assertion
						(momentSaveRes.body.message).should.match('Please fill Moment name');
						
						// Handle Moment save error
						done(momentSaveErr);
					});
			});
	});

	it('should be able to update Moment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Moment
				agent.post('/moments')
					.send(moment)
					.expect(200)
					.end(function(momentSaveErr, momentSaveRes) {
						// Handle Moment save error
						if (momentSaveErr) done(momentSaveErr);

						// Update Moment name
						moment.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Moment
						agent.put('/moments/' + momentSaveRes.body._id)
							.send(moment)
							.expect(200)
							.end(function(momentUpdateErr, momentUpdateRes) {
								// Handle Moment update error
								if (momentUpdateErr) done(momentUpdateErr);

								// Set assertions
								(momentUpdateRes.body._id).should.equal(momentSaveRes.body._id);
								(momentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Moments if not signed in', function(done) {
		// Create new Moment model instance
		var momentObj = new Moment(moment);

		// Save the Moment
		momentObj.save(function() {
			// Request Moments
			request(app).get('/moments')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Moment if not signed in', function(done) {
		// Create new Moment model instance
		var momentObj = new Moment(moment);

		// Save the Moment
		momentObj.save(function() {
			request(app).get('/moments/' + momentObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', moment.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Moment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Moment
				agent.post('/moments')
					.send(moment)
					.expect(200)
					.end(function(momentSaveErr, momentSaveRes) {
						// Handle Moment save error
						if (momentSaveErr) done(momentSaveErr);

						// Delete existing Moment
						agent.delete('/moments/' + momentSaveRes.body._id)
							.send(moment)
							.expect(200)
							.end(function(momentDeleteErr, momentDeleteRes) {
								// Handle Moment error error
								if (momentDeleteErr) done(momentDeleteErr);

								// Set assertions
								(momentDeleteRes.body._id).should.equal(momentSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Moment instance if not signed in', function(done) {
		// Set Moment user 
		moment.user = user;

		// Create new Moment model instance
		var momentObj = new Moment(moment);

		// Save the Moment
		momentObj.save(function() {
			// Try deleting Moment
			request(app).delete('/moments/' + momentObj._id)
			.expect(401)
			.end(function(momentDeleteErr, momentDeleteRes) {
				// Set message assertion
				(momentDeleteRes.body.message).should.match('User is not logged in');

				// Handle Moment error error
				done(momentDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Moment.remove().exec();
		done();
	});
});