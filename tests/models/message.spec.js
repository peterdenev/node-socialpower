describe("Message model", function(){
  var helpers = require("../helpers")
  var Message = require("../../models/server/Message")
  
  beforeEach(helpers.connectMongoose)
  afterEach(helpers.disconnectMongoose)

  it("insert, check and del msg", function(next){
    Message.create({
      "body": "test msg"
    }, function(err, message){
      expect(message.body).toBe("test msg")
      Message.findOne({body: "test msg"}, function(err, found_message){
        expect(found_message.body).toBe("test msg")
        Message.findOneAndRemove({body: "test msg"}, function(err, del_message){          
          next()
        })
      })      
    })
  })

  it("create same msg", function(next){
    var test_txt = "unique text";
    Message.count({ body: test_txt }, function (err, count) {
      if (err) console.log('err');
      console.log('there are %d jungle adventures', count);    

      Message.create({
        "body": test_txt
      }, function(err, message){
        expect(message.body).toBe(test_txt)

        Message.count({ body: test_txt }, function (err, count) {
          if (err) console.log('err');
          console.log('there are %d unique text adventures', count);

          Message.create({
            "body": message.body
          }, function(err, message_2){  
            Message.count({ body: test_txt }, function (err, count) {
              if (err) console.log('err');
              console.log('there are %d unique text adventures', count);      
              //expect(err).not.toBe(null)
              next()
            })
          })    
        })  
      })
    })
  })

  
})