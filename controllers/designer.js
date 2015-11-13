var Component = require("./component");
var Menu = require("./menu");
var designerTemplate = require("./designer.hbs");

class Designer extends Component {
	constructor(containerID) {
		super(containerID, "Grackle | Designer");
		this.global();
	}
	render(callback) {
		let menu = new Menu("", false, false, true, true);
		menu.render(function (err, menuView) {
			var view = designerTemplate({theMenu:menuView});
			callback(null, view);
		});
	}
	onDragStart(event, fieldName) {
  	var dt = event.dataTransfer;
  	dt.setData("text/field", fieldName);
	}

  onDragOver(event) {
 		if (event.dataTransfer.types[0] == "text/field") {
    	document.getElementById("dragpoint").innerHTML = "(" + event.clientX + "," + event.clientY + ")";
    	event.target.style.border = "1px solid blue";
    	event.preventDefault();
  	}
	}
	onDragLeave(event) {
  	if (event.dataTransfer.types[0] == "text/field") {
    	document.getElementById("dragpoint").innerHTML = "";
    	event.target.style.border = "1px solid rgba(0,0,0,0.0)";
  	}
	}

	onDrop(event) {
  	if(event.dataTransfer.types[0] == "text/field") {
  		var target = document.getElementById("formTarget");
    	target.innerHTML += event.dataTransfer.getData("text/field") + "<br>";
    	event.target.style.border = "1px solid rgba(0,0,0,0.0)";
    	event.target.scrollTop = event.target.scrollHeight;
    	event.preventDefault();
  	}
	}
}

module.exports = Designer;
