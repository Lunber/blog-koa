/**
 * Created by lwb on 2016/9/13.
 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/blog');
var db = mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

module.exports = db