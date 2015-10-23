var views = require("../scripts/views");
var datastore = require("../scripts/datastore");
var modelUserList = require("../model/userList");
var page = require("../scripts/page");

function displayAdmin(adminList) {
  var template = Handlebars.compile(views.list.menu);
  var menuHTML = template({username:cache.username, isAdmin: true});
  template = Handlebars.compile(views.list.admin);
  var adminHTML = template(adminList);
  document.getElementById("main").innerHTML = menuHTML + adminHTML;
}

function getAdmin(callback) {
  if (cache.UserList) {
    return callback();
  }

  datastore("GET", "userList", null, function (err,res) {
    if (err) {
      return callback(err);
    }

    cache.userList = new modelUserList.UserList();
    cache.userList.loadObject(res);
    callback();
  });
}

function viewAdmin() {
  getAdmin(function (err) {
    if (err) {
      $("#placeForAlert").addClass("alert alert-warning");
      $("#placeForAlert").html(err);
      return;
    }

    page.setURL("/admin", "Grackle | Admin");
    displayAdmin(cache.userList);
  });
}

function deleteUser(id) {
  var obj = {
    id: id
  };
  datastore("DELETE", "deleteUser", obj, function (err, obj) {
    if (err) {
      $("#placeForAlert").addClass("alert alert-warning");
      $("#placeForAlert").html(err);
      return;
    }

    cache.userList.delete(id);
    displayAdmin(cache.userList);
  });
}

exports.viewAdmin = viewAdmin;
exports.setGlobals = function () {
  global.deleteUser = deleteUser;
};
