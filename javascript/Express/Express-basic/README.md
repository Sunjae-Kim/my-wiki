# Express Basic

## 1. Getting Started

### 1.1 Initiating

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

### 1.2 CRUD Operation

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

#### 1.2.1 Database Setting

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

#### 1.2.2 GET All

```js
app.get('/api/games', (req, res) => {
  res.send(games);
});
```



#### 1.2.3 GET

```js
app.get('/api/games/:id', (req, res) => {
  const game = games.find((game) => game.id === parseInt(req.params.id));
  if(!game){ // id에 맞는 게임이 없을 때
    res.status(404).send(`Game with given id(${req.params.id}) is not found`);
  }
  res.send(game);
});
```