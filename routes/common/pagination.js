var Posts = require('../../models/posts');
var amountPerPage = 2;

var pageQuery = function(params) {
    condition = {};
    if (params.username) {
        condition['username'] = params.username;
    }
    if (params.status) {
        condition['status'] = params.status;
    }

    var total = Posts.count(condition);

    var query = Posts.find(condition).skip((params.page - 1) * amountPerPage).limit(amountPerPage);

    query.sort({
        'updateTime.date': -1
    });

    return {
        total: total,
        query: query
    };
}

module.exports = pageQuery;