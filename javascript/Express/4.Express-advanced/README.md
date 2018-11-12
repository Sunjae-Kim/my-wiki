# Express Advanced

[TOC]

## 1. Middleware

### 1.1 Middleware란?

- Middleware의 역할은 request Object를 받아서 Client에게 response를 보내는 역할이다.

- **Route Handler 함수**

  모든 middleware에서의 데이터 공정 및 작업을 마치고 response로 가기 전 수행되야 하기 때문에 항상 request의 **마지막**에 있게 된다.

- `app.use()`

   Request를 받은 뒤 Route Handler 함수로 넘어가기 전에 지시한 작업을 마치고 다음 미들웨어로 넘겨주는 함수이다.

  > `app.use(express.json());` 함수의 경우에는 원래는 request.body 에서 string 값으로 넘어오나 해당 함수로 인해서 Object로 넘어오게 됨

  

---

### 1.2 Middleware Customizing

- `next`

  제어를 다음 Middleware로 넘긴다.

  ```js
  app.use( function(req, res, next){
    console.log('모든 요청이 들어올때 마다 로그를 남깁니다.');
    next();
  })
  ```

  > `next()`를 하지 않으면 요청을 넘기지 않고 middleware가 요청을 계속 holding하고 있게 된다.

- **올바른 사용법**

  Middleware는 `app.use(express.json());` 함수와 같이 함수를 정의한 뒤 `app.use()` 안에서 함수 이름으로만 사용하는게 정석

  ```js
  /* logger.js */
  function log(req, res, next){
    console.log('모든 요청이 들어올때 마다 로그를 남깁니다.');
    next();
  }
  module.exports = log;
  ```

  ```js
  /* index.js */
  const logger = require('./logger');
  app.use(logger);
  ```


---

### 1.3 **Other Middleware**

- ##### `express.urlencoded`

  Body-parser의 기반이며 url혹은 body로 들어오는 요청을 핸들링 해준다.

  ```js
  app.use(express.urlencoded({ extended: true }));
  ```

- ##### `express.static`

  Express에서 정적 파일을 제공하는 미들웨어

  명시적으로 public이라는 폴더에서 사용할 static 파일들을 관리한다.

  ```js
  app.use(express.static("public"));
  ```

  > 404 Not Found page, JSON 파일 등 필요에 따라 사용할 수 있다.

- ##### `helmet`

  Request들을 최초에 모두 확인 및 검열하는 미들웨어

  ```js
  const helmet = require("helmet");
  app.use(helmet());
  ```

  > Request를 최초 확인하는 미들웨어로 가장 윗 단계에 선언한다.

- ##### `morgan`

  로그를 남기고 관리해주는 미들웨어

  ```js
  const morgan = require("morgan");
  // development 환경에서 로그를 남기겠다는 뜻 
  if(app.get('env') === 'development'){
    console.log('MORGAN을 실행합니다.')
    app.use(morgan('dev'));
  }
  ```

  > NODE_ENV로 사용하는 노드의 환경을 설정해야한다.
  >
  > `$ export NODE_ENV=development` 로 설정해두도록 하자.
  >
  > Window에서는 PowerShell에서 `$env:<var name> = 'value'` 로 환경변수 설정하도록 하자.

- ##### `config`

  **config** 파일을 만든 뒤 안에 **defualt.json** / **development.json** / **production.json** 파일들을 만든다.

  ```js
  const config = require("config");
  console.log(config.get('key'));
  ```

  > `morgan `에서 설정한 환경변수 별로 key의 value 값이 **config**폴더 안에있는 JSON파일의 value로 설정이 된다.

- ##### `debug`

  `$ export DEBUG=app:<env>`의 `env` 값을 설정하여 어느 환경에서 debug를 실행할지 관리하는 미들웨어

  ```js
  const startupDebugger = require('debug')('app:startup');
  const dbDebugger = require('debug')('app:db');
  console.log(app.get('debug'));
  
  if(app.get('env') === 'development'){
    startupDebugger('MORGAN을 실행합니다.') 
    dbDebugger('DB Connecting');
    app.use(morgan('dev'));
  }
  ```