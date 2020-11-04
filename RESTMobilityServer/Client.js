const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const { exit } = require('process');
const request = require('request');
const fs = require('fs');

var access = fs.createWriteStream('client1_stats.log');
process.stdout.write = process.stderr.write = access.write.bind(access);
process.on('uncaughtException', function(err) {
    //console.error((err && err.stack) ? err.stack : err);
  });


const user_request = {
    url: 'http://210.102.181.219:8080/request1',
    headers: {
        'dummies': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante i'
    }
};
var i = 0;

var count = 0;
setInterval(() => {
requestsent();
count ++;
if(count>10000){
    process.exit(1);
}
}, 10);


async function requestsent () {
    var i = Math.floor(Math.random() * 100000) + 1
    console.time(i);
    request(user_request, function (error, response, body) {
        console.timeEnd(i)

    });
  }