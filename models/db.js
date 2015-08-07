var settings = require('../settings'),
    mongoose = require('mongoose'),
    db = mongoose.createConnection(settings.host, settings.db);
    db.on('error', console.error.bind(console, '数据库连接错误:'));
    db.once('open', function() {
        console.log('connected to db: ' + settings.db);
    });

module.exports = db;