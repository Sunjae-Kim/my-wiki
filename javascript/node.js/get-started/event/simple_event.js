const EventEmitter = require('events');
  // Core Module이며 Class객체인것을 짐작할 수 있다.
class Job extends EventEmitter {}
const job = new Job();

/* 
  Event Listener
  .on method로 event를 listening하고 있다가
  .emit method로 event 함수를 실행한다.
*/
job.on('warning', season => {
  console.log(`${season} is comming`)
});

job.emit('warning', 'winter');