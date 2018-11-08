const Logger = require('./logger');
const logger = new Logger();

  // Listener 등록
logger.on('logMessage', arg => {
  console.log('Listener 호출!', arg);
});
logger.on('logging', arg => {
  console.log(arg.data);
});
logger.log('This is message');