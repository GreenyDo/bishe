var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/bishe');
var schema = mongoose.Schema;

var userSchema = new schema({
	name:String,
	password:String,
	age:String,
	email:String,
	phone:String,
	products:Array	
});

var user = db.model('user',userSchema);
module.exports = user;