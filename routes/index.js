/**
 * Created by lwb on 2016/9/2.
 */
model.exports = function (router) {
    router.get('/', function *(next) {
        this.response.body = 'Hello World!';
    });

    router.get('/test', function* (next) {
        this.response.body = {msg: 'hello json'}
    })
}