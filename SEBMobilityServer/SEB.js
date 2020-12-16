var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)
var port = 1883

server.listen(port, function() {
  console.log('server listening on port', port);
});


aedes.subscribe('/mobility002', function(packet, cb) {
  var user_request = {
    url: 'http://210.102.181.219:8080/request',
    headers: {
        'packet':  packet.payload.toString()
    }
  };
  request(user_request, function (error, response, body) {
  })
});

aedes.subscribe('/user002', function(packet, cb) {
  var user_request = {
    url: 'http://210.102.181.219:8080/request',
    headers: {
        'packet':  packet.payload.toString()
    }
  };
  request(user_request, function (error, response, body) {
  })
});

aedes.subscribe('/mobility001', function(packet, cb) {
  var user_request = {
    url: 'http://210.102.181.219:8080/request',
    headers: {
        'packet':  packet.payload.toString()
    }
  };
  request(user_request, function (error, response, body) {
  })
});

aedes.subscribe('/user001', function(packet, cb) {
  var user_request = {
    url: 'http://210.102.181.219:8080/request',
    headers: {
        'packet':  packet.payload.toString()
    }
  };
  request(user_request, function (error, response, body) {
  })
});