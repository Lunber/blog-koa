var app = require('koa')();
var Router = require('koa-router');
var json = require('koa-json');
var cors = require('koa-cors');
var co = require('co');

app.use(json())
app.use(cors());

var router = new Router({
    prefix: '/api'
});

router.get('/', function *(next) {
    this.response.body = 'Hello World!';
});

router.get('/test', function* (next) {
    this.response.body = {msg: 'hello json'}
})

app.use(router.routes());

app.listen(8888);