var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://59.9.86.21:3000')
 
client.on('connect', function () {
  client.subscribe('/user001', function (err) {
    if (!err) {
      client.publish('/', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})