# Express Basic

## 1. Initiating

 `$ npm i express`

`$ touch index.js`

```js
const express = require('express');
const app = express();
```

````js
// Middleware Function
app.get('/', (req, res) => {
  //send to client
  res.send('Happy Hacking');
});
````

```js
// req.params.<:parameter>
app.get('/:name', (req, res) => {
  res.send(`Hi ${req.params.name}`);
})
```
```js
// Setting Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

## 2 CRUD Operation

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

NoSQL의  데이터베이스 형식

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

### 2.2 GET All

```js
app.get('/api/games', (req, res) => {
  res.send(games);
});
```

> Database의 모든 Data를 보냄

### 2.3 GET

```js
app.get('/api/games/:id', (req, res) => {
  const game = games.find((game) => game.id === parseInt(req.params.id));
  if(!game){ // id에 맞는 게임이 없을 때
    res.status(404).send(`Game with given id(${req.params.id}) is not found`);
  }
  res.send(game);
});
```

> id를 parameter로 받아서 database에서 찾아서 반환
>
> 요청하는 id에 맞는 game이 없을 시 404status를 보내고 에러 메세지 출력

### 2.4 POST

#### 2.4.1 Create

> 이제는 create를 해야하지만 front가 없기 때문에 POSTMAN 프로그램을 사용해보자.
>
> Download: <https://www.getpostman.com/apps> 
>
> 실행한 뒤 Method를 Post로 설정하고 
>
> 'Body'  > 'raw' 선택 후 JSON파일로 보낼 형식을 바꾼다. 
>
> ```js
> // 보낼 데이터를 body에 작성한다.
> {
> 	"title" : "Heros of the Storm"
> }
> ```

```js
app.use(express.json()); // json 파일을 받을 수 있도록 설정

// /* POST /api/games/1 */
app.post('/api/games/', (req, res) => {
  const game = {
    id: games.length + 1,
    title: req.body.title,
  };
  games.push(game);
  res.send(game);
});
```

> 이제 Postman에서 Send를 한 뒤 Get All을 해보면 4번에 히오스가 들어온 것을 확인할 수 있다.

#### 2.4.2 Joi (Validation Test Module)

>  절대로 믿어선 안되는것중 하나가 사용자가 입력하는 데이터이다.		
>
>  ​										- 유태용 강사

`$ npm i joi` 로 검사 모듈을 설치하자

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

> schema Object에 들어와야 하는 데이터의 표준을 설정해두자
>
> `const result = Joi.validate()` 코드로 Object를 검사한다.
>
> `if(result.error)` 조건문으로 에러가 있을 시 작업을 수행하자.



### 2.5 DELETE

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

> `[].splice(index, 1)` 코드로 원하는 인덱스의 원소를 삭제하도록 한다.



### 2.6 PUT

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
> 그 반환값의 error 값을 출력하기 위해 비 구조화를 사용하여
>
> 반환된 값의 error키값의 value를 error라는 객체에 담겠다는 뜻이다.