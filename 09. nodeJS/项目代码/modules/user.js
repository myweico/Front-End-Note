var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/project')
var Schema = mongoose.Schema
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  nickname: {
    type: String,
    required: true
  },

  password: {
    type: String,
    requried: true
  },

  createdTime: {
    type: Date,
    default: Date.now
  },

  lastModifiedTime: {
    type: Date,
    default: Date.now
  },

  bio: {
    type: String,
    default: ''
  },

  avatar: {
    type: String,
    default: '/public/images/avatar-default.png'
  },

  birthday: {
    type: Date
  },

  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  
  limit: {
    /**
     * 0：无限制
     * 1：无法发言
     * 2：无法登录
     */
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)