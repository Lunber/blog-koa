/**
 * Created by lwb on 2016/9/2.
 */
var Router = require('koa-router');
var views = require('co-views')
var koaBody = require('koa-body')();
var User = require('../controllers/user.js')
var Post = require('../controllers/post.js')

var main_router = new Router({})
var api_router = new Router({
    prefix: '/api'
});
var render = views('backhtml', {
    map: {
        html: 'swig'
    }
})

module.exports = function(app) {
    api_router
        .post('/admin', koaBody, User.login)
        .get('/signout', User.signOut)
        .post('/savepost',koaBody,Post.savePost)

    main_router
        .get('/admin', function*(next) {
            this.body = yield render('index')
        })
        .get('/admin/home', User.checkLogin)
        .get('/admin/home', function*(next) {
            this.body = yield render('admin_home')
        })

    app.use(api_router.routes());
    app.use(main_router.routes());
}
