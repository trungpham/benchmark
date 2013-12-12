var express = require('express');
var app = express();
app.listen(process.env.PORT || 3000);


app.get('/', function(request, response) {
    console.log("start");
    var sleepTime = Math.floor(Math.random()*100)+100;
    setTimeout(function(){
        console.log(sleepTime);
        response.send(sleepTime);
        console.log("done");
    }, sleepTime);

});