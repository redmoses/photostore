'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Moment Schema
 */
var MomentSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please provide a title or a brief description for the moment',
		trim: true
	},
	photo: {
		type: String,
		default: '',
		required: 'You need to upload a photo to store the moment.',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Moment', MomentSchema);
