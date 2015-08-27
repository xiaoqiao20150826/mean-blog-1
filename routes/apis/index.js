var markdown = require('markdown').markdown;
var pageQuery = require('../common/pagination');

var indexRoute = function(router) {
    /* GET home page. */
    router.get('/', function(req, res, next) {
        var page = req.query.p ? parseInt(req.query.p) : 1;
        var statement = pageQuery({
            status: 1,
            page: page
        });

        var data = {
            title: '主页',
            users: req.session.users,
            page: page,
            total: 0,
            posts: []
        };
        statement.total.exec(function(err, total) {
            if (err) {
                total = 0;
            }
            data.total = total;
            statement.query.exec(function(err, posts) {
                if (err) {
                    posts = [];
                }
                posts.forEach(function(post) {
                    post.content = markdown.toHTML(post.content).slice(0, 200);
                });
                data.posts = posts;
                res.status(200).json(data);
            });
        });

        // Posts.find({
        //     status: 1
        // }, function(err, posts) {
        //     if (err) {
        //         posts = [];
        //     }
        //     posts.forEach(function(post) {
        //         post.content = markdown.toHTML(post.content).slice(0, 200);
        //     });
        //     data.posts = posts;
        //     res.status(200).json(data);
        // });
    });
}

module.exports = indexRoute;