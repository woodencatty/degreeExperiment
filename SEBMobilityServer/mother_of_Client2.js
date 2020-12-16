const { exec } = require('child_process');

var count = 0;

var setThread = setInterval(() => {
    count++;

    exec('node --no-warnings Client2.js ', (error, stdout, stderr) => {


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

}, 10);


