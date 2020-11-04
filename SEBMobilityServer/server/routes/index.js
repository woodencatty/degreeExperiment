var express = require('express');
var router = express.Router();

const request = require('request');

var pidusage = require('pidusage')
var logger = require('logger').createLogger('RESTserver_stats.log'); // logs to a file

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
/* GET home page. */
router.get('/request', function(req, res, next) {
        console.log(req.headers.packet);
        res.end('ok');
});

module.exports = router;
