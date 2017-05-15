var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/bishe');
var schema = mongoose.Schema;

var userSchema = new schema({
	name:String,
	password:String,
	age:String,
	email:String,
	phone:String,
	productsname:Object,
	products:Object
});

var user = db.model('user',userSchema);
module.exports = user;