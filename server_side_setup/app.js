var host = "0.0.0.0";
var port = 3777;
var express = require("express");
var path = require('path');
var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// app.get("/", function (request, response) { //root dir
//     response.send("Hello!!");
// });
app.listen(port, host);