const EventEmitter = require('events');
class Emitter extends EventEmitter{};
emitter = new Emitter();

/* 
  Event Listener
  .on method로 event를 listening하고 있다가
  .emit method로 event 함수를 실행한다.
*/
emitter.on('knock', () => {
  console.log('누구세요?');
});

emitter.on('knock', () => {
  console.log('저리가세요!');
});

emitter.emit('knock'); // 결과 : 저리가세요!
emitter.emit('knock'); // 