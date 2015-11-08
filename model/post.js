var model = require("./model");
var moment = require("moment");

function Post(_id,title,text,date,blogID,domID) {
  model.Model.call(this);
  this._id = _id;
  this.title = title;
  this.text = text;
  this.date = date;
  this.blogID = blogID;
  this.domID = domID;
  this.afterLoad();
  this.schema = {
    _id: "string",
    title: "string",
    text: "string",
    date: Date,
    blogID: "string"
  };
}
Post.prototype = new model.Model();
Post.prototype.constructor = Post;
Post.prototype.afterLoad = function () {
  if (this.date) {
    this.dateString = moment(this.date).format("MMMM Do YYYY, h:mm a");
    this.dateOnly = moment(this.date).format("YYYY-MM-DD");
    this.timeOnly = moment(this.date).format("HH:mm:ss");
    this.ISOString = this.date.toISOString();
  }
};

exports.Post = Post;
