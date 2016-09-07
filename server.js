var app = require('koa')();
var Router = require('koa-router');
var json = require('koa-json');
var cors = require('koa-cors');
var co = require('co');
var serve = require('koa-static')


app.use(json())
app.use(cors());

var main_router = new Router({})

var router = new Router({
    prefix: '/api'
});

router.get('/', function *(next) {
    this.response.body = 'Hello World!';
})
    .get('/test', function* (next) {
    this.response.body = {msg: 'hello json'}
})

main_router.get('/',function* (next) {
    this.response.body = 'Hello main_router'
})

app.use(router.routes());
app.use(main_router.routes())
// app.use(serve('backhtml'))
// app.use(serve('dist'))

app.listen(8888);