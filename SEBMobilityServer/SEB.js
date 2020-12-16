var aedes = require('aedes')()
var server = require('net').createServer(aedes.handle)
var port = 1883

server.listen(port, function() {
  console.log('server listening on port', port);
});

aedes.subscribe('test', function(packet, cb) {
  console.log('Published', packet.payload.toString());
});