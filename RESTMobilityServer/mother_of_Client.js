const { exec } = require('child_process');
const fs = require('fs');

var count = 0;

var setThread = setInterval(() => {
    count++;

    exec('node Client.js', (error, stdout, stderr) => {


      var access = fs.createWriteStream('/sdcard/Download/client'+count+'_stats.log');
      stdout = access.write.bind(access);
      process.on('uncaughtException', function(err) {
          //console.error((err && err.stack) ? err.stack : err);
        });

        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
      
    if(count>3){
        clearInterval(setThread);
    }

}, 100);




