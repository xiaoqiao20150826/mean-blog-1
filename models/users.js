var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
      username: String,
      password: String,
      email: String,
      phone: String,
      portrait: String,
      nickname: String,
      status: Number,
      updateTime: Date,
      createdTime: Date
});

module.exports = mongoose.model('User', UserSchema);