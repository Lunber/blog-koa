var Post = require('../model/post.js')

const savePost = function *(next) {
    var date = new Date();
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    console.log(time.day)
    let data = {
        id: date.getTime(),
        title: this.request.body.title,
        content: this.request.body.content,
        category: this.request.body.category,
        createdAt: time.minute,
        createdDay: time.day
    }
    console.log(data)
    var post = new Post(data)
    post.save((err) => {
        if (err){
            console.log(err)
        }else {
            
        }
    })
}

const getPostList = function *(next) {
    yield Post.find({},{content:0},(err, posts) => {
        console.log(posts)
        return this.response.body = posts
    })
}

module.exports = {
    savePost,
    getPostList
}