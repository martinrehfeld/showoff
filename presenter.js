var io = require('socket.io');
var http = require('http');

server = http.createServer(function(req, res){});

server.listen(9091);
var socket = io.listen(server);
console.log("== Server listening on localhost:9091");

var presenter;
var client;
var informedBoth = false;
socket.on('connection', function(conn){
  // new client is here!
  conn.on('message', function(data) {
    data = JSON.parse(data);

    if(data.type == 'client') {
      client = conn;
      console.log("= client connected");
    } else if(data.type == 'presenter') {
      presenter = conn;
      console.log("= presenter connected");
    } else if(informedBoth) { // send it through
      if(presenter.id == conn.id) { // message from presenter
        data.sender = 'presenter';
        data = JSON.stringify(data);
        client.send(data);
        console.log("= presenter → client: "+data);
      }
      else if(client.id == conn.id) {
        data.sender = 'client';
        data = JSON.stringify(data);
        presenter.send(data);
        console.log("= client → presenter: "+data);
      }
    }

    if(!informedBoth && client && presenter) {
      socket.broadcast(JSON.stringify({'connected': 'both'}));
      console.log("= both sides connected, let's get rollin'");
      informedBoth = true;
    }
  });

  conn.on('disconnect', function() {
    if(presenter && presenter.id == conn.id) {
      presenter = false;
      console.log("= presenter gone");
      informedBoth = false;
    }

    if(client && client.id == conn.id) {
      client = false;
      console.log("= client gone");
      informedBoth = false;
    }
  });
});
