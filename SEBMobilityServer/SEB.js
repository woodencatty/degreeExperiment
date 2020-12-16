var mosca = require('mosca');
const request = require('request');

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
 

function compute() {
  pidusage(process.pid, function (err, stats) {
      console.log(stats.cpu)
      total_cpu = total_cpu + stats.cpu;
      logger.info(stats.cpu);


    // => {
    //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
    //   memory: 357306368,    // bytes
    //   ppid: 312,            // PPID
    //   pid: 727,             // PID
    //   ctime: 867000,        // ms user + system time
    //   elapsed: 6650000,     // ms since the start of the process
    //   timestamp: 864000000  // ms since epoch
    // }
  })
}
 
var cpu_read = setInterval(function() {
    compute();
    count ++; 
    if(count>11){
      console.log("CPU average = " + total_cpu / 11 + "%");
      clearInterval(cpu_read);
    }
  }, 1000)




var server = new mosca.Server(settings);
 
server.on('clientConnected', function(client) {
    var user_request = {
      url: 'http://210.102.181.219:8080/request',
      headers: {
          'packet': client.id.toString()
      }
    };
    request(user_request, function (error, response, body) { 
    })
});
 
// fired when a message is received
server.on('published', function(packet, client) {
  
});
 
server.on('ready', setup);
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

/*
aedes.subscribe('/mobility002', function(packet, cb) {

});*/