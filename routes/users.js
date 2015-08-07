var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
/* GET users listing. */
router.get('/login', function(req, res) {
    res.render('login', {
        title: '登录',
    });
});

router.post('/login', function(req, res) {
    res.status(200).json([
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.',
     'age': 1},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.',
     'age': 2},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.',
     'age': 3}
  ]);
});

router.get('/reg', function(req, res) {
    res.render('reg', {
        title: '注册',
    });
});

router.post('/check', function(req, res) {
    // var field = req.field;
    // var value = req.value;
    res.status(200).json(req.body);//Users.find({req.body.field: req.body.value}););
});

module.exports = router;
