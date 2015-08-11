var express = require('express');
var router = express.Router();
var Posts = require('../models/posts');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
var fs = require('fs');

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
    var tmpPath = req.files.file.path;
    var targetPath = 'public/images/' + req.files.file.name;
    var data = {
        result: false
    };
    console.log(targetPath);
    //将上传的临时文件移动到指定的目录下
    fs.rename(tmpPath, targetPath, function(err) {
        if (err) {
            throw err;
        }
        //删除临时文件
        fs.unlink(tmpPath, function() {
            if (err) {
                throw err;
            }
            //将当前的用户写到会话中
            data.result = true;
            res.status(200).json(data);
        })
    })
});

module.exports = router;