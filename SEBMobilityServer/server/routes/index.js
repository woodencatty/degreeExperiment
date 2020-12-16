var express = require('express');
var router = express.Router();

const request = require('request');

var pidusage = require('pidusage')
var logger = require('logger').createLogger('SEBserver_stats.log'); // logs to a file

total_cpu = 0.0;

logger.format = function(level, date, message) {
  return message;
};
var count = 0;
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
    if(count>62){
      console.log("CPU average = " + total_cpu / 62 + "%");
      clearInterval(cpu_read);
    }
  }, 1000)


/* GET home page. */
router.get('/request', function(req, res, next) {
        console.log(req.headers.packet);
        res.end('ok');
});

module.exports = router;
