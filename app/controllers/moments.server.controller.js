'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Moment = mongoose.model('Moment'),
	_ = require('lodash');

/**
 * Create a Moment
 */
exports.create = function(req, res) {
	var moment = new Moment(req.body);
	moment.user = req.user;

	moment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(moment);
		}
	});
};

/**
 * Show the current Moment
 */
exports.read = function(req, res) {
	res.jsonp(req.moment);
};

/**
 * Update a Moment
 */
exports.update = function(req, res) {
	var moment = req.moment ;

	moment = _.extend(moment , req.body);

	moment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(moment);
		}
	});
};

/**
 * Delete an Moment
 */
exports.delete = function(req, res) {
	var moment = req.moment ;

	moment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(moment);
		}
	});
};

/**
 * List of Moments
 */
exports.list = function(req, res) { 
	Moment.find().sort('-created').populate('user', 'displayName').exec(function(err, moments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(moments);
		}
	});
};

/**
 * Moment by user
 */
exports.momentByUser = function(req, res) {
	Moment.findByUser(req.user).sort('-created').populate('user', 'displayName').exec(function(err, moments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(moments);
		}
	});
};

/**
 * Moment middleware
 */
exports.momentByID = function(req, res, next, id) { 
	Moment.findById(id).populate('user', 'displayName').exec(function(err, moment) {
		if (err) return next(err);
		if (! moment) return next(new Error('Failed to load Moment ' + id));
		req.moment = moment ;
		next();
	});
};

/**
 * Moment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.moment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
