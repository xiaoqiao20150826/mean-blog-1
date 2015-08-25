var express = require('express');
var router = express.Router();
var Posts = require('../models/posts');
var markdown = require('markdown').markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {
        title: '主页',
        users: req.session.users,
        posts: []
    };
    Posts.find({status: 1}, function(err, posts) {
        if (err) {
            posts = [];
        }
        posts.forEach(function(post) {
            post.content = markdown.toHTML(post.content).slice(0, 200);
        });
        data.posts = posts;
        console.log(data);
        res.status(200).json(data);
    });
});

module.exports = router;