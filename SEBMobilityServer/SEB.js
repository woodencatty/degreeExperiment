var mosca = require('mosca');
 
var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};
 
var settings = {
  port: 1883,
  backend: ascoltatore
};
 
var server = new mosca.Server(settings);
 
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});
 
// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});
 
server.on('ready', setup);
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

/*
aedes.subscribe('/mobility002', function(packet, cb) {
  var user_request = {
    url: 'http://210.102.181.219:8080/request',
    headers: {
        'packet':  packet.payload.toString()
    }
  };
  request(user_request, function (error, response, body) { console.log("gone");
  })
});*/