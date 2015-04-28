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
		required: 'Please fill Moment title',
		trim: true
	},
	photos: [
		{
			file_path: {
				type: String,
				default: '',
				trim: true
			}
		}
	],
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
