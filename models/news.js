var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
	new_id:String,
	user_id_who:String,
	user_id:String,
	date:String,
	text:String,
	picture:String,
	event:String
});

var news = mongoose.model('News', newsSchema);

module.exports = news;