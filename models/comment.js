var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	id_post:String,
	user_id_who_comment:String,
	user_id_comments:String,
	textComment:String,
	likes:Number,
	wholiked:[
		{
			idUser:String
		}
	],
	dataC:String

});

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;