var mongoose = require("mongoose");

var Message = new mongoose.Schema({
  body: { type: String, unique: true, required: true }
})

Message.static("available", function(body, callback) {
  this.findOne({ body: body }, callback);
})

Message.pre("save", function(next) {
  //if (!this.isModified('body'))
  //  return next();

  /*
  var prom = this.findOne({ body: "some text" }).exec();
  prom.then(function(msg){
  	console.log(msg.body);
  });
*/
/*
this.count({ body: 'jungle' }, function (err, count) {
  if (err) console.log('err');
  console.log('there are %d jungle adventures', count);
});
*/
  //console.log(prom);

	//this.available(body,function(){

	//});
  //console.log(res);
 
  return next();
})

module.exports = mongoose.model("Message", Message)