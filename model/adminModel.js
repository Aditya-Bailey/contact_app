const mongodb = require('mongodb');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var adminSchema   = new Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
    },

    contact: {
        type: String,
    },

    password: {
        type: String
    }
            });

module.exports = mongoose.model('Admin', adminSchema);