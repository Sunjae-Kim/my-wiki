# Express Basic
- [1. Initiating](#1-initiating)
- [2. CRUD Operation](#2-crud-operation)
  - [2.1 Database Setting](#21-database-setting)
  - [2.2 GET All](#22-get-all)
  - [2.3 GET](#23-get)
  - [2.4 POST](#24-post)
    - [2.4.1 Create](#241-create)
    - [2.4.2 Joi (Validation Test Module)](#242-joi-validation-test-module)
  - [2.5 DELETE](#25-delete)
  - [2.6 PUT](#26-put)
## 1. Initiating

- Express-Demo에서 간단하게 구현시켜본 Express 모델의 플랫폼을 조금 더 구조화 해서 살펴보자.

- `$ npm i express`  통해서 Express 프레임워크를 설치한다.

### 1.1 Module import

- NodeJS에서의 모듈을 불러올때는 `require`을 통해서 불러온다.

  ```js
  const express = require('express');
  const app = express();
  ```

  > `express()` 함수로 app 객체를 만들고 app를 통해서 client의 요청들을 받아서 작업을 하게 된다.
  >
  > 모델들이 많아지게 되면 모델별로 `router`를 만들어서 관리하게 된다. 자세한 내용은 추후에 살펴보자.

### 1.2 Router handler function

- `app` 객체로 client들의 요청을 받게된다. 이러한 모델들을 middleware라고 하는데 `app.get()` 과 같은 직접적으로 client에게 응답을 보내게 되는 함수를 **router handler function** 이라고 한다. middleware 중에서도 항상 마지막에 위치해야하는 점 기억하자.

  ````js
  // Middleware Function
  app.get('/', (req, res) => {
    //send to client
    res.send('Happy Hacking');
  });
  ````

  > 가장 기본적인 모델이다. root 페이지에 접속하게되면 'Happy Hacking' 이라는 문구를 출력한다.

  ```js
  // req.params.<:parameter>
  app.get('/:name', (req, res) => {
    res.send(`Hi ${req.params.name}`);
  })
  ```

  > 사용자에게 정보를 받아서 handling 할 수 있는 모델이다. url을 통해 `/` 이후에 넘어온 값을 `req` 객체의 `params` 에 저장해두고 전달한다.
  >
  > `/IU` 를 입력하게 되면 `Hi IU` 가 출력이 될것이다.

### 1.3 Port Setting

- Client의 요청을 포트를 통해 받아야하기 때문에 아래 함수를 통해 app객체가 어느 포트를 통해 요청을 받을것인지 정의 해준다.

  ```js
  // Setting Port
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  ```

  > `const port = process.env.PORT || 3000;` 코드는 `process.env` 에서 사용할 수 있는 port를 반환받되 없으면 300포트를 쓰겠다는 뜻이다.



## 2. CRUD Operation

- 위에서 포트세팅까지 마쳤으면 Client의 요청을 받을 준비가 모두 완료되었다.

- 간단한 CURD Operation을 구현할 예정이며 아래의 구조로 진행될 예정이다.

  ``` js
  /* 
    CRUD Operation
    Create   Read    Update  Destroy
    POST     GET     PUT     DELETE
  */
  
  /* GET /api/games/ */
  app.get();
  
  /* GET /api/games/1 */
  app.get();
  
  /* POST /api/games/1 */
  app.post();
  
  /* PUT /api/games/1 */
  app.put();
  
  /* DELETE /api/games/1 */
  app.delete();
  ```

### 2.1 Database Setting

- CURD를 하기 위해서는 data들을 담을 수 있는 공간이 필요하다.

- MERN Stack을 구현할 예정이기 때문에 MongoDB를 사용하여 NoSQL 방식의 데이터를 객체로 만들어보자.

  ```js
  /* 
    Database
  */
  const games = [
    { id: 1, title: 'Warcraft' },
    { id: 2, title: 'Diablo' },
    { id: 3, title: 'Hearth Stone' },
  ]
  ```

  > Blizzard게임들로 Database를 만들어보았다.
  >
  > 기존의 Database 모델들과는 달리 NoSQL에서는 위처럼 `key : value` 의 형태로 데이터들을 보관하고 다루게 될것이다.

### 2.2 GET All

- 모든 요청의 가장 기본인 전체 데이터를 보내주는 코드를 작성해보자.

  ```js
  app.get('/api/games', (req, res) => {
    res.send(games);
  });
  ```

  > Database 객체인 games의 모든 data를 보내주는 코드이다.

### 2.3 GET

- 특정 1개의 데이터를 요청받았을때 데이터가 있는지 확인하고 있다면 보내주는 코드를 작성해보자.

  ```js
  app.get('/api/games/:id', (req, res) => {
    const game = games.find((game) => game.id === parseInt(req.params.id));
    if(!game){ // id에 맞는 게임이 없을 때
      res.status(404).send(`Game with given id(${req.params.id}) is not found`);
    }
    res.send(game);
  });
  ```

  > id를 매개변수로 client를 통해 받아서 오게되며 요청하는 id에 맞는 game이 없을 시 404 status 를 보내고 에러 메세지 출력하게 된다.

### 2.4 POST

- 사용자의 정보를 Database에 작성하는 요청을 받았을 때 수행하는 코드를 작성해보자.

#### 2.4.1 Create

- 사용자에게서 정보를 받은 뒤 Database에 입력해야하지만 요청을 보내는 페이지를 따로 구현을 하지 않았으니 **POSTMAN**이라는 프로그램을 사용하여 POST요청을 app객체로 보내보자.

  - **Download**: <https://www.getpostman.com/apps> 

- 실행한 뒤 Method를 Post로 설정한 후 'Body'  > 'raw' 선택 후 JSON파일로 보낼 형식을 바꾼다. 

- URL에 요청을 보낼 서버를 입력하고 아래와 같이 Body를 작성해보자.

   ```js
   {
   	"title" : "Heros of the Storm"
   }
   ```

- POST 요청을 받았을 때 받은 요청의 정보를 Database에 작성하는 코드를 구현해보자.

   ```js
   app.use(express.json()); // json 파일을 받을 수 있도록 설정
   
   app.post('/api/games/', (req, res) => {
     const game = {
       id: games.length + 1,
       title: req.body.title,
     };
     games.push(game);
     res.send(game);
   });
   ```

   > `app.use` 함수는 대표적인 middleware중 하나로 client의 요청을 JSON파일로 받을 수 있게 해주는 역할을 한다.
   >
   > `id` 같은 경우에는 나중에 MongoDB를 사용하게 되면 자동 할당되나 지금은 임의로 객체를 만들어 쓰고 있는 점으로 간단하게 현재 값에서 1씩 추가하면서 등록해보도록 하자.
   >
   > 이제 Postman에서 Method를 GET으로 한뒤 매개변수 없이 `/` 에서 요청을 보내면 위에 작성한 Get All 함수로 모든 data들을 확인할 수 있으며  4번에 히오스가 들어온 것을 확인할 수 있다.

#### 2.4.2 Joi (Validation Test Module)

- 절대로 믿어선 안되는 것중 하나가 사용자가 입력하는 데이터이다. 이를 내가 만든 조건에 맞게 유효성 검사를 해주는 고마운 모듈이 있다. 바로 **Joi**이다.

- `$ npm i joi` 로 검사 모듈을 설치하자

- 사용법은 역시 `require` 로 불러로면 되며 지금은 router handler 함수 내에서 사용해보도록 하자.

  (추후에는 Schema들을 다 정리하여 Model로서 따로 관리할 것이다.)

  ```js
  const Joi = require('joi');
  
  app.post('/api/games/', (req, res) => {
    const schema = {
      title: Joi.string().min(2).required(),
    }
    const result = Joi.validate(req.body, schema);
    if(result.error) return res.status(400).send(result.error.message);
    ...
  }
  ```

  > schema Object에 들어와야 하는 데이터의 표준을 설정해두자.
  >
  > `validate()` 함수 안의 매개변수로 사용자가 보낸 정보와 표준이되는 schema를 넣고 그 결과를 `result` 로 반환받도록 하자.
  >
  > `if(result.error)` 조건문으로 에러가 있는지 확인하고 있을 시 `400` 에러를 응답하도록 하자.

### 2.5 DELETE

- GET요청만큼 쉬운 DELETE요청을 받았을 때 작업을 작성해보자.

  ```js
  app.delete('/api/games/:id', (req,res) => {
    // games 에서 id 로 game 찾기
    const game = games.find((game) => game.id === parseInt(req.params.id));
      
    // 없으면 404
    if(!game){ 
      return res.status(404).send(`Game with given id(${req.params.id}) is not found`);
    }
  
    // Delete logic 수행
    const index = games.indexOf(game);
    games.splice(index,1);
    res.send(game);
  });
  ```

  > 위 주석들과 같이 우선 삭제하고자 하는 데이터가 있는지 확인한 뒤 delete logic을 수행하자.
  >
  > 지금은 실제 Database의 정보가 아니라 Object들을 담고있는 배열에서 삭제하기 때문에 삭제시에는 `[].splice(index, 1)` 코드로 원하는 인덱스의 원소를 삭제하도록 한다.

### 2.6 PUT

- 가장 까다로운 부분일 수도 있지만 이미 위에서 구현한 코드들을 조합해서 쓰면 된다.

  ```js
  app.put('/api/games/:id', (req,res) => {
    
    // id에 맞는 게임이 있는지 검사
    const game = games.find((game) => game.id === parseInt(req.params.id));
    if(!game){
      return res.status(404).send(`the game with given id(${req.params.id}) was not found`);
    }
    
    // 새로 작성한 내용의 유효성 검사
    const { error } = validateGame(req.body);
  
    if(error){
      return res.status(400).send(error.message);
    }
  
    // 수정
    game.title = req.body.title;
    res.send(game);
  });
  
  function validateGame(game){
    const schema = {
      title: Joi.string().min(2).required(),
    }
    return Joi.validate(game, schema);
  }
  ```

  > `validateGame();` 이 반환하는건 `Joi.validate()`의 반환값과 똑같다.
  >
  > 그 반환값의 `error ` 를 찾는것이 목적이기 때문에 **Destructuring** 작업을 통해서 error만 객체로 받아온 뒤 유효성 검사를 하게되면 코드가 훨씬 간결하게 된다.
  >
  > (Destructuring에 대해서는 ES6 문서를 참조해보도록 하자.)

