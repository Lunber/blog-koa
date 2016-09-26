/**
 * Created by lwb on 2016/9/13.
 */
var mongoose = require('mongoose');


var Schema = mongoose.Schema

var postSchema = new Schema({
  id: Number,
  title: String,
  content: String,
  category: String,
  tags: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
  createdDay:String
})

module.exports = mongoose.model('Post' , postSchema)
