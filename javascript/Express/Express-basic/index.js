const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Happy Hacking');
});

app.get('/:name', (req, res) => {
  res.send(`Hi ${req.params.name}`);
})

/* 
  Database
*/
const games = [
  { id: 1, title: 'Warcraft' },
  { id: 2, title: 'Diablo' },
  { id: 3, title: 'Hearth Stone' },
]

/* 
  CRUD Operation
  Create   Read    Update  Destroy
  POST     GET     PUT     DELETE
*/

const schema = {
  title: Joi.string().min(2).required(),
}

/* GET /api/games/ */
app.get('/api/games', (req, res) => {
  res.send(games);
});

// /* GET /api/games/1 */
app.get('/api/games/:id', (req, res) => {
  const game = games.find((game) => game.id === parseInt(req.params.id));
  if(!game){ // id에 맞는 게임이 없을 때
    res.status(404).send(`the game with given id(${req.params.id}) was not found`);
  }
  res.send(game);
});

// /* POST /api/games/1 */
app.post('/api/games/', (req, res) => {
  const result = Joi.validate(req.body, schema);
  if(result.error) return res.status(400).send(result.error.message);

  const game = {
    id: games.length + 1,
    title: req.body.title,
  };
  games.push(game);
  res.send(game);
});

app.put('/api/games/:id', (req,res) => {

  // id에 맞는 게임이 있는지 검사
  const game = games.find((game) => game.id === parseInt(req.params.id));
  if(!game){
    return res.status(404).send(`the game with given id(${req.params.id}) was not found`);
  }

  // 새로 작성한 내용의 유효성 검사
  const result = Joi.validate(req.body, schema);
  if(result.error){
    return res.status(400).send(result.error.message);
  }

  // 수정
  game.title = req.body.title;
  res.send(game);
});



// /* DELETE /api/games/1 */
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


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});