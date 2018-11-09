const express = require('express');
const app = express();

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

/* GET /api/games/ */
app.get('/api/games', (req, res) => {
  res.send(games);
});

// /* GET /api/games/1 */
app.get('/api/games/:id', (req, res) => {
  const game = games.find((game) => game.id === parseInt(req.params.id));
  if(!game){ // id에 맞는 게임이 없을 때
    res.status(404).send(`Game with given id(${req.params.id}) is not found`);
  }
  res.send(game);
});

// /* POST /api/games/1 */
// app.post();

// /* PUT /api/games/1 */
// app.put();

// /* DELETE /api/games/1 */
// app.delete();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});