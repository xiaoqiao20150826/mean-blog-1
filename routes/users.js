var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET users listing. */
router.get('/login', function(req, res) {
    res.render('login', {
        title: '登录',
        modules: ['users/loginCtrl'],
        css:['form']
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
        modules: ['users/regCtrl'],
        css:['form']
    });
});

module.exports = router;
