var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var compression = require("compression");
var cors = require("cors");

mongoose.Promise = global.Promise;
require("dotenv").config();

app.set("dbUrl", process.env.DB_URL);

mongoose.connect(app.get("dbUrl"));

app.use(
  cors()
); /*
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}*/

var userRouter = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(compression());
app.set("port", process.env.PORT || 8080);

app.use("/user", userRouter);
//app.use(express.static(__dirname + "/restaurante-client/build"));

console.log(__dirname);

app.get("*", function(req, res) {
  console.log("hello***dfdfdsfsf*********");
  res.send("hello");
  //res.sendFile(__dirname + "/restaurante-client/build/index.html"); // load the single view file (angular will handle the page changes on the front-end)
});

server.listen(app.get("port"), function() {
  console.log("listening on server...." + app.get("port"));
});
