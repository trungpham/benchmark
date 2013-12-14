var express = require('express');
var app = express();
app.listen(process.env.PORT || 3000);


app.get('/', function(request, response) {
    console.log("start");
    var sleepTime = 200;
    setTimeout(function(){
        console.log(sleepTime);
        response.send(200,"okay");
        console.log("done");
    }, sleepTime);

});