var express = require('express');
var http = require('http');
var app = express();
app.listen(process.env.PORT || 3000);


app.get('/', function(request, response) {
    console.log('.');
    var count = 0;
    var doneCB = function(res){
        count++;
        if (count == 3){
            response.send(200,"okay");
        }
    };


    http.get({hostname:'localhost', port:3001, path:'/', agent:false}, doneCB).on("error", function(e){console.error(e); response.send(500, "error");});
    http.get({hostname:'localhost', port:3002, path:'/', agent:false}, doneCB).on("error", function(e){console.error(e); response.send(500, "error");});
    http.get({hostname:'localhost', port:3003, path:'/', agent:false}, doneCB).on("error", function(e){console.error(e); response.send(500, "error");});

});