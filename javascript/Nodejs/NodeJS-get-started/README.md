# Node.js

서버를 만드는 수많은 개발 도구 중에서 굳이 node.js를 쓰는 이유는 3가지로 정리할 수 있다.

1. 비동기 입출력 (Non-blocking I/O)
2. 이벤트 기반 입출력 (Event Driven I/O)
3. 노드 패키지 매니저 (Node Package Manager)

``` js
/* 
  1. 비동기 입출력 : read()를 실행한 뒤 결과를 기다리지 않고 바로 daAdd()를 실행 
  2. 이벤트 기반 입출력 : read()가 끝나고 결과 'contents'가 나오면 구현해둔 이벤트 함수
  	 doShow()가 실행됨
*/
file.read('a.txt', function(contents){				
    doDhow(contents);								
})

const doAdd = (a, b) => a+b;
const result = doAdd(10,10);

const doShow = contents => {
    console.log(`Contents : ${contents}`);
}
```

<br>

## 1. Global Object

Node.js에서 사용되는 전역 객체들 

> `global.console.log();` 

### 1.1 Process

| code               | description                            |
| ------------------ | -------------------------------------- |
| `process.env`      | 컴퓨터의 시스템 환경들을 담고있는 객체 |
| `process.argv`     | 매개변수로 받음                        |
| `process.exit(0);` | Default exit code                      |
| `process.exit(1);` | To exit with a 'failure' code          |

### 1.2 OS

Memory확인 가능

```js
const os = require('os');

const totalMemory = os.totalmem() / 1024 / 1024 / 1024 ;
const freeMemory = os.freemem() / 1024 / 1024 ;

console.log(`Total Memory ${totalMemory} mb`);
console.log(`Free Memory ${freeMemory} mb`);
```

<br>

## 2. Node parameters

노드는 하나의 함수안에 실행이 된다.

module은 global이 아니라 node가 실행되는 함수 안에 있는 매개변수이다.

```js
(function (exports, require, module, __filename, __dirname) { 
 	// your script
}
```

### 2.1 Module

> logger라는 모듈을 만들어보자

```js
console.log('1번만 출력됨'); // require을 통해 최초 호출 시 1번만 수행이 됨

  // 방법 1
const log = (msg) => {
  // other logics
  console.log(`Logging message: ${msg}`);
}
module.exports = log; // 해당 js파일을 require로 호출 했을 때 log 함수를 사용할 수 있음

  // 방법 2
module.exports = function(numbersToSum = []){
  let sum = 0;
  numbersToSum.forEach(number => sum += number);
  return sum;
};
```

> 다른곳에서 사용해보자

```js
const logger = require('./logger');

logger("GET '/' 127.0.0.1 ")
/*
  실행결과 :
  Logging message: GET '/' 127.0.0.1
*/
```

### 2.2 Exports

```js
exports.sayHelloInKorean = () => "안녕";
exports.sayHelloInEnglish = () => "hi";
exports.sayHelloInSwedish = () => "Hej";
```

```js
module.exports = {
  sayHelloInKorean() {
    return "안녕";
  },
  sayHelloInEnglish() {
    return "hi";
  },
  sayHelloInSwedish() {
    return "Hej";
  },
}
```

> export를 할 때 위 예시와 같이 Object형식으로 만들수도 있지만 Class 형식으로 만들수도 있다.
>
> export하는 객체를 Module Guide에 명시 해서 사용시 용이하게 해야한다. 
>
> 일반적으로 첫글자를 대문자로 하는 경우가 Class이다.

### 2.3 Require

| Code                                          | Type        | Search From          |
| --------------------------------------------- | ----------- | -------------------- |
| `require('fs');`                              | Core Module | 기본 내장            |
| `require('express');`                         | Node Nodule | Node Package Manager |
| `require('./utility');`                       | Javascript  | Workspace            |
| `require('./configs/database.json');`         | JSON        | Workspace            |
| `require('./routes');`  routes란 파일 없을 시 | /index.js   | Workspace/ index.js  |

### 2.4 __filename, __dirname

```js
const path = require('path');
const pathObj = path.parse(__filename);
console.log(pathObj);
/*
  실행결과 :
  { root: 'C:\\',
  dir: 'C:\\Users\\kimsj\\Git\\TIL\\javascript\\Nodejs\\path',
  base: 'app.js',
  ext: '.js',
  name: 'app' }
*/
```


> Windows와 Mac의 경로 표시 포맷이 다르기 때문에 상호 호환이 되지 않는점 유의해야 한다.

<br>

## 3. HTTP

### 3.1 Getting Started

```js
const http = require('http');
const url = 'http://www.csszengarden.com/'

http.get(url, response => {
  let chunkCount = 0;
    
  response.on('data', chunk => {
    chunkCount++;
    console.log('====================')
    console.log(chunk.toString('utf8'))
  })

  response.on('end', () => {
    console.log(`res가 ${chunkCount}로 나눠졌어요.`)
  })
    
})
```

### 3.2 Event Emitter

#### 3.2.1 Single Event

```js
const EventEmitter = require('events'); 	// Class 객체
class Emitter extends EventEmitter{};		// 상속받는다
emitter = new Emitter();

/* 
  Event Listener
  .on method로 event를 listening하고 있다가
  .emit method로 event 함수를 실행한다.
*/
emitter.on('knock', () => {
  console.log('누구세요?');
});

emitter.emit('knock'); // 결과 : 누구세요?
```

> `emitter.on('발생조건', 동작함수)` : 발생 조건에 맞춰 함수가 동작하도록 감시시작
>
> `emitter.emit('발생조건')` : 해당 조건에 맞춰 동작하는 함수 실행

#### 3.2.1 Multipe Event

##### logger.js

```js
const EventEmitter = require('events');

class Logger extends EventEmitter{
  log(msg) {
    console.log(msg, ' // msg is logging!');
    this.emit('logMessage', { id: 1, url: 'http://blog.com/'});
    this.emit('logging', { data: 'Event is happening!'});
  }
}

module.exports = Logger;
```

##### app.js

```js
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
```

> 실행결과:
>
> This is message  // msg is logging!
> Listener 호출! { id: 1, url: 'http://blog.com/' }
> Event is happening!