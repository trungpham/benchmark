var vertx = require('vertx');
var console = require('vertx/console');
var client1 = vertx.createHttpClient().host('localhost').port(3001);
var client2 = vertx.createHttpClient().host('localhost').port(3002);
var client3 = vertx.createHttpClient().host('localhost').port(3003);

vertx.createHttpServer().requestHandler(function(req) {
    var count = 0;
    var doneCB = function(res){
        count++;
        if (count == 3){
            req.response.end("okay");
        }
    };

    var exCB = function(e){
        console.log(e);
        req.response.statusCode(500).end("error");
    }

    client1.getNow('/', function(resp) {

        resp.bodyHandler(doneCB);
    }).exceptionHandler(exCB);

    client2.getNow('/', function(resp) {

        resp.bodyHandler(doneCB);
    }).exceptionHandler(exCB);

    client3.getNow('/', function(resp) {

        resp.bodyHandler(doneCB);
    }).exceptionHandler(exCB);

}).listen(3000, 'localhost');