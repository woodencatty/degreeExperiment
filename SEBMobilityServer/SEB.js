const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 3000

var pidusage = require('pidusage')
var logger = require('logger').createLogger('SEB_Broker_stats.log'); // logs to a file

logger.format = function(level, date, message) {
    return message;
  };

function compute() {
    pidusage(process.pid, function (err, stats) {
        console.log("CPU : "+stats.cpu + "%")
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
   
function interval(time) {
    setInterval(function() {
      compute(function() {
        interval(time)
      })
    }, time)
  }

  interval(1000)


server.listen(port, function () {
  console.log('server started and listening on port ', port)
})


server.on('publish', (packet, client)=>{

  var user_request = {
    url: 'http://210.102.181.219:8080/request',
    headers: {
        'packet': packet
    }
  };
  console.log(packet);
  request(user_request, function (error, response, body) {

});
})