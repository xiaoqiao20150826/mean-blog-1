var express = require('express');
var router = express.Router();
var Posts = require('../models/posts');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
var fs = require('fs');
var gm = require('gm'),
    imageMagick = gm.subClass({
        imageMagick: true
    });
var markdown = require('markdown').markdown;
/* GET users listing. */
router.get('/publish', function(req, res) {
    if (!req.session.users) {
        res.redirect('/users/login');
    } else {
        res.render('posts/publish', {
            title: '发布',
            users: req.session.users
        });
    }
});

router.get('/user/:username', function(req, res) {
    Posts.find({
        username: req.params.username
    }, function(err, posts) {
        if (err) {
            posts = [];
        }
        posts.forEach(function(post) {
            post.content = markdown.toHTML(post.content);
        });
        res.render('posts/posts', {
            title: '主页',
            users: req.session.users,
            posts: posts,
            author: posts[0].username
        });
    });
});

router.get('/user/:username/:day/:title', function(req, res) {
    Posts.find({
        username: req.params.username,
        'createdTime.day': req.params.day,
        title: req.params.title
    }, function(err, posts) {
        if (err) {
            posts = [];
        }
        posts.forEach(function(post) {
            post.content = markdown.toHTML(post.content);
        });
        res.render('posts/posts', {
            title: '主页',
            users: req.session.users,
            posts: posts
        });
    });
});

router.post('/publish', function(req, res) {
    var post = {
        username: req.session.users.username,
        title: req.body.title,
        content: req.body.content
    };

    var data = {
        result: false
    };

    Posts.findOne(post, function(err, docs) {
        if (err) {
            console.log(err);
            return handleError(err);
        }

        if (docs) {
            data.result = '不能发布完全相同的文章';
            res.status(200).json(data);
            return;
        } else {
            post['status'] = 1;
            var date = new Date();
            post['createdTime'] = {
                date: date,
                year: date.getFullYear(),
                month: date.getFullYear() + "-" + (date.getMonth() + 1),
                day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
                    date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            };
            post['updateTime'] = post['createdTime'];
            console.log(post);
            Posts.create(post, function(err) {
                if (err) {
                    console.log(err);
                    return handleError(err);
                } else {
                    data.result = true;
                    res.status(200).json(data);
                    return;
                }
            })
        }
    });
});

router.get('/upload', function(req, res) {
    if (!req.session.users) {
        res.redirect('/users/login');
    } else {
        res.render('posts/upload', {
            title: '文件上传',
            users: req.session.users
        });
    }
});

router.post('/upload', multipartyMiddleware, function(req, res) {
    var tmpPath = req.files.file.path;
    var targetPath = 'public/images/' + req.files.file.name;
    var size = req.files.file.size;
    var data = {
        path: false,
        name: false
    };
    if (size > 3 * 1024 * 1024) {
        fs.unlink(tmpPath, function() { //fs.unlink 删除用户上传的文件
            res.end('1');
        });
    } else if (req.files.file.type.split('/')[0] != 'image') {
        fs.unlink(tmpPath, function() {
            res.end('2');
        });
    } else {
        fs.exists(targetPath, function(exists) {
            if (exists) {
                fs.unlink(tmpPath, function() {
                    data.path = '/images/' + req.files.file.name;
                    data.name = req.files.file.name;
                    res.status(200).json(data);
                    res.end('2');
                });
            } else {
                imageMagick(tmpPath)
                    .resize(150, 150, '!') //加('!')强行把图片缩放成对应尺寸150*150！
                    .autoOrient()
                    .write(targetPath, function(err) {
                        if (err) {
                            console.log(err);
                            res.end();
                        }
                        fs.unlink(tmpPath, function() {
                            data.path = '/images/' + req.files.file.name;
                            data.name = req.files.file.name;
                            res.status(200).json(data);
                            res.end('3');
                        });
                    });
            }
        });
    }
});

module.exports = router;