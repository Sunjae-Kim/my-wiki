const EventEmitter = require('events');

class Logger extends EventEmitter{
  log(msg) {
    console.log(msg, ' // msg is logging!');
    this.emit('logMessage', { id: 1, url: 'http://blog.com/'});
    this.emit('logging', { data: 'Event is happening!'});
  }
}

module.exports = Logger;