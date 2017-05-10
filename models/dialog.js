var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dialogSchema = new Schema({
  id_user1:String,
  id_user2:String,
  date:{ type: Date, default: Date.now },
  status:Boolean,
  msg:[
  {
    author:String,
    name:String,
    text:String,
    datem:String,
  }
  ]
});


var Dialog = mongoose.model('Dialog', dialogSchema);

module.exports = Dialog;

