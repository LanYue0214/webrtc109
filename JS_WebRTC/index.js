'use strict';

//Loading dependencies & initializing express
var os = require('os');
var express = require('express');
var app = express();
var https = require('https');                  // I change http to https
var path = require('path');
var fs = require('fs');
//For signalling in WebRTC
var socketIO = require('socket.io');


app.use(express.static('public'))

app.get("/", function(req, res){
	res.render("index.ejs");
});

// creating about ssl key
var server = https.createServer(
	{ 
		key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
		cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
	},app
); // changing http to https 

server.listen(process.env.PORT || 8080, () => console.log('Server server on port 8080'));

var io = socketIO(server);

io.sockets.on('connection', function(socket) {

	// Convenience function to log server messages on the client.
	// Arguments is an array like object which contains all the arguments of log(). 
	// To push all the arguments of log() in array, we have to use apply().
	function log() {
	  var array = ['Message from server:'];
	  array.push.apply(array, arguments);
	  socket.emit('log', array);
	}
  
    
    //Defining Socket Connections
    socket.on('message', function(message, room) {
	  log('Client said: ', message);
	  // for a real app, would be room-only (not broadcast)
	  socket.in(room).emit('message', message, room);
	});
  
	socket.on('create or join', function(room) {
	  log('Received request to create or join room ' + room);

	  //var clientsInRoom = io.sockets.adapter.rooms.get(room).size;
	  var clientsInRoom = io.sockets.adapter.rooms[room];
	  log('clientinroom: '+ clientsInRoom);
	  //log('test length; ' + Object.keys(clientsInRoom).length ); //(.length) is error
	  
	//log('tet object.keys(clientsInRoom.sockets): '+Object.keys(clientsInRoom));
	  //var numClients = clientsInRoom  ? Object.keys(clientsInRoom.sockets): 0;
	  var numClients = clientsInRoom ? Object.keys(clientsInRoom).length : 0;
	  log('numClients: '+ numClients);
	  log('Room ' + room + ' now has ' + numClients + ' client(s)');
  
	  if (numClients === 0) {
		socket.join(room);
		log('Client ID ' + socket.id + ' created room ' + room);
		socket.emit('created', room, socket.id);
  
	  } else if (numClients === 1) {
		log('Client ID ' + socket.id + ' joined room ' + room);
		io.sockets.in(room).emit('join', room);
		socket.join(room);
		socket.emit('joined', room, socket.id);
		io.sockets.in(room).emit('ready');
	  } else { // max two clients
		socket.emit('full', room);
	  }
	});
  
	socket.on('ipaddr', function() {
	  var ifaces = os.networkInterfaces();
	  for (var dev in ifaces) {
		ifaces[dev].forEach(function(details) {
		  if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			socket.emit('ipaddr', details.address);
		  }
		});
	  }
	});
  
	socket.on('bye', function(){
	  console.log('received bye');
	});
  
  });

