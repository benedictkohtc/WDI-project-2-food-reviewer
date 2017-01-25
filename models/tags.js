const mongoose = require('mongoose');

let tagSchema = new mongoose.Schema({
	tag: {
		type: String,
		required: true
	},
	locationsArray: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Locations' }]
});

module.exports = mongoose.model('locationTags', tagSchema);
