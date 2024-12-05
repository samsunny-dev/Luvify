const mongoose = require('mongoose');

const referencedSchema = new mongoose.Schema({
    name: String,
    phoneOrEmail: String,
    gender: String,
    preferredGenders: [String],

    photos: [String]
    
});

const ReferencedModel = mongoose.model('ReferencedModel', referencedSchema);

module.exports = ReferencedModel;
