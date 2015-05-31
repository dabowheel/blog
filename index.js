var fs = require("fs");
var express = require('express');
var app = express();
var datastore = require("./datastore/main");

app.use(express.static('public'));
app.post("/datastore/main/", datastore.processRequest);


var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
