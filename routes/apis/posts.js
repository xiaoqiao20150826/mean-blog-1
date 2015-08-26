var Posts = require('../../models/posts');
var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
var fs = require('fs');
var gm = require('gm'),
    imageMagick = gm.subClass({
        imageMagick: true
    });
var markdown = require('markdown').markdown;
var amountPerPage = 2;
//functions
var newTime = function() {
    var date = new Date();
    return {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
        second: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + " " +
            ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    };
}

var pageQuery = function(params) {
        var total = Posts.count({
            username: params.username,
            status: params.status
        });

        var query = Posts.find({
            username: params.username,
            status: params.status
        }).skip((params.page - 1) * amountPerPage).limit(amountPerPage);

        query.sort({
            'updateTime.date': -1
        });

        return {
            total: total,
            query: query
        };
    }
    /* GET users listing. */
var postsRoute = function(router) {
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

    router.get('/posts/user/:username', function(req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;
        var data = pageQuery({
            username: req.params.username,
            status: 1,
            page: page
        });
        data.query.exec(function(err, posts) {
            if (err) {
                posts = [];
            }
            posts.forEach(function(post) {
                post.content = markdown.toHTML(post.content).slice(0, 200);
            });
            res.render('posts/posts', {
                title: posts[0].username + "的博文",
                users: req.session.users,
                page: page,
                posts: posts,
                author: posts[0].username
            });
        });
    });

    router.get('/posts/user/:username/:day/:title', function(req, res) {
        Posts.find({
            username: req.params.username,
            'createdTime.day': req.params.day,
            title: req.params.title,
            status: 1
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

    router.post('/posts/publish', function(req, res) {
        var post = {
            username: req.session.users.username,
            title: req.body.title,
            content: req.body.content,
            status: 1
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
                post['createdTime'] = newTime();
                post['updateTime'] = post['createdTime'];
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

    router.get('/posts/edit/:username/:day/:title', function(req, res) {
        var data = {
            post: null
        };
        Posts.find({
            username: req.params.username,
            'createdTime.day': req.params.day,
            title: req.params.title,
            status: 1
        }, function(err, post) {
            if (err) {
                post = [];
            }
            data.post = post[0];
            res.status(200).json(data);
        });
    });

    router.post('/posts/edit', function(req, res) {
        var post = {
            "username": req.session.users.username,
            "title": req.body.title,
            "status": 1
        };

        var content = req.body.content;

        var data = {
            result: false
        };

        Posts.findOne(post, function(err, docs) {
            if (err) {
                console.log(err);
                return handleError(err);
            }

            if (docs) {
                if (docs['content'] == content) {
                    data.result = '请编辑后再保存修改';
                    res.status(200).json(data);
                    return;
                } else {
                    post['content'] = content;
                    post['updateTime'] = newTime();
                    var update = {
                        $set: post
                    };
                    Posts.update({
                        _id: docs._id
                    }, update, function(err) {
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
            } else {
                data.result = '您编辑的文件不存在';
                res.status(200).json(data);
                return;
            }
        });
    });

    router.get('/posts/remove/:username/:day/:title', function(req, res) {
        if (!req.session.users) {
            res.redirect('/users/login');
        } else {
            var post = {
                username: req.params.username,
                'createdTime.day': req.params.day,
                title: req.params.title,
                status: 1
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
                    post['status'] = 0;
                    Posts.update({
                        _id: docs._id
                    }, post, function(err) {
                        if (err) {
                            console.log(err);
                            return handleError(err);
                        } else {
                            data.result = true;
                            res.redirect('/');
                            return;
                        }
                    })

                } else {
                    data.result = '该博文不存在';
                    res.status(200).json(data);
                    return;
                }
            });
        }
    });

    router.post('/posts/upload', multipartyMiddleware, function(req, res) {
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
}

module.exports = postsRoute;