var express = require('express');
var router = express.Router();
var indexRoute = require('./apis/index.js');
var usersRoute = require('./apis/users.js');
var postsRoute = require('./apis/posts.js');

indexRoute(router);
usersRoute(router);
postsRoute(router);

module.exports = router;