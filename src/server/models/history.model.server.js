'use strict';

let mongoose = require('mongoose');

let odcHistorySchema = mongoose.Schema({
	contentyear: {
		type: String,
		default: '',
		trim: true,
		required:'Link label is required'
	},
	contenthtml: {
		type: String,
		trim: true,
		default: ''
	},
	imagepath: {
		type: String,
		trim: true,
		default: ''

	}
});

module.exports = mongoose.model('ODCHistory', odcHistorySchema, 'odchistory');
