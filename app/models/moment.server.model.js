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
	name: {
		type: String,
		default: '',
		required: 'Please fill Moment name',
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