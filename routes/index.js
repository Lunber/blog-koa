/**
 * Created by lwb on 2016/9/2.
 */
var Router = require('koa-router');
var views = require('co-views')
var koaBody = require('koa-body')();
var Post = require('../model/post.js')
var User = require('../model/user.js')

var main_router = new Router({})
var api_router = new Router({
    prefix: '/api'
});
var render = views('backhtml', {
    map: {html: 'swig'}
})

module.exports = function (app) {
    api_router.get('/', function*(next) {
        this.response.body = 'Hello World!';
    })
        .get('/test', function*(next) {
            this.response.body = {
                msg: 'hello json'
            }
        })
        .post('/admin', koaBody, function*(next) {
            console.log(this.request.body.pwd)
            console.log(this.session)
            if (this.request.body.pwd == 123456) {
                this.response.body = {
                    msg: 'success',
                    code: '1'
                }
                this.session.login = "login"
                console.log(this.session.login)
                console.log(this.session)
            } else {
                this.response.body = {
                    msg: 'false',
                    code: '0'
                }
            }
        })
        .get('/signout',function* (next) {
            this.response.body = {
                msg: 'success',
                code: '1'
            }
            this.session.login = ""
        })
        .post('/savepwd',koaBody,function* (next){
          console.log(this.request.body.pwd)
          var pwd = this.request.body.pwd
          var user = new User({
            password:pwd
          })
          console.log(user.password)
          user.save()
          User.find(function(err,users){
            console.log(users)
          })
        })

    main_router.get('/admin', function*(next) {
        this.body = yield render('index')
    }).get('/admin/home', checkLogin)
        .get('/admin/home', function*(next) {
            this.body = yield render('admin_home')
        })

    app.use(api_router.routes());
    app.use(main_router.routes());
}

var checkLogin = function*(next) {
    if (!this.session.login) {
        return this.redirect('/admin')
    }
    yield next
}
