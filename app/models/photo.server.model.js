'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Photo Schema
 */
var PhotoSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Photo title',
		trim: true
	},
	path: {
		type: String,
		default: '',
		required: 'Please select a photo to upload',
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

mongoose.model('Photo', PhotoSchema);
