var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = new Schema({
	user_id_who:String,
	user_id:String,
	text: String,
	picture:String,
	likes:Number,
	wholiked:[
			{
				idUser:String
			}
		],
	date:String,
	comments:[{
		commentsId:String
	}]

});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;