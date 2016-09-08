var app = require('koa')();
var Router = require('koa-router');
var json = require('koa-json');
var cors = require('koa-cors');
var co = require('co');
var serve = require('koa-static')
var ejs = require('ejs')
var views = require('co-views')
// var render = require('co-ejs')
// var path = require('path');


app.use(json())
app.use(cors());
// app.use(render(app, {
//   root: path.join(__dirname, 'backhtml'),
//   layout: 'layout',
//   viewExt: 'ejs',
//   cache: true,
//   debug: true
// }));
var render = views('backhtml' , {
   map: { html: 'swig' }
})
// render(app, {
//   root: path.join(__dirname, 'backhtml'),
//   layout: '__layout',
//   viewExt: 'ejs',
//   cache: false,
//   debug: true
// });

var main_router = new Router({})

var api_router = new Router({
    prefix: '/api'
});

api_router.get('/', function *(next) {
    this.response.body = 'Hello World!';
})
    .get('/test', function* (next) {
    this.response.body = {msg: 'hello json'}
})

main_router.get('/admin',function* (next) {
  this.body = yield render('index')
  // yield this.render('index');
})

app.use(api_router.routes());
app.use(main_router.routes())
// app.use(serve('backhtml'))
app.use(serve('dist'))

app.listen(8888);
