var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(http);

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/yaaha';
MongoClient.connect(url, function(err, db) {

  io.on('connection', function (socket) {
      console.log('a user connected');

      socket.on("new_message", function (data) {
          io.emit("new_message", data);
      })
  });

  app.use(express.static(__dirname + '/src/client/public'));

  app.get("/login/:phonenumber", function(req, res){
    var phonenumbers = db.collection("phonenumbers");

    phonenumbers.ensureIndex({number: 1}, {unique: true}, function(err, indexName){
      if(err){
        res.send(JSON.stringify({
          "result": "Phone number exists",
          "success": true
        }))
        return false;
      }
    })

    phonenumbers.insertOne({
      "number": req.params.phonenumber,
      "verified": false,
      "secretCode": 12312
    }, function(err, result) {
      if(!err){
        console.log(result);
        res.send(JSON.stringify({
          "result": "Phone number added",
          "success": true
        }))
        console.log("Inserted a " + req.params.phonenumber + " into the users collection.");
      } else {
        res.send(JSON.stringify({
          "result": "Already exists",
          "success": false
        }))
      }
    });

  })

  app.get("/login/confirm/:secretCode/:phoneNumber", function(req, res){
    var phonenumbers = db.collection("phonenumbers");

    phonenumbers.find({
      number: req.params.phoneNumber,
      secretCode: parseInt(req.params.secretCode)
    }, function(err, result){
      if(!err){
        result.toArray(function(err, item){
          if(item[0].secretCode === parseInt(req.params.secretCode)){
            res.send(JSON.stringify({
              "success": true
            }))
          }
        })
      }
    })
  })

  app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/checktoken/:token", function(req, res){

  })

  // start listen http server
  http.listen(3000, function () {
      console.log('listening on *:3000');
  });

  console.log("Connected correctly to server.");
  // db.close();
});
