var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("new_message", function(data){
    io.emit("new_message", data);
  })
});

app.use(express.static(__dirname + '/src/client/public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "index.html"));
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});