var mongoose = require('./db'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var PostsSchema = new Schema({
      username: String,
      title: String,
      content: String,
      status: Number,
      updateTime: {},
      createdTime: {}
});

module.exports = mongoose.model('Posts', PostsSchema);