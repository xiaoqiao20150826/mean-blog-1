var settings = require('../settings'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-blog');

module.exports = mongoose;