"use strict";
var datastore = require("../scripts/datastore");
var views = require("../scripts/views");
var page = require("../scripts/page");

function displayVerifyEmail(verified) {
  var template = Handlebars.compile(views.list.verifyEmail);
  document.getElementById("main").innerHTML = template({verified: verified});
}

function viewVerifyEmail(hash,code) {
  datastore("GET","verifyEmail/" + hash + "/" + code, null, function (err,res) {
    var verified = true;
    if (err) {
      verified = false;
    }
    displayVerifyEmail(verified);
    if (err) {
      $("#placeForAlert").addClass("alert alert-warning");
      $("#placeForAlert").html(err);
    }
  });
}

function clickGoHome() {
  page.setURL("/");
  global.viewInitial();
}

exports.viewVerifyEmail = viewVerifyEmail;
exports.setGlobals = function () {
  global.clickGoHome = clickGoHome;
};
