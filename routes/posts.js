var express = require('express');
var router = express.Router();
var Posts = require('../models/posts');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

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
    var file = req.files.file;

    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
});

module.exports = router;