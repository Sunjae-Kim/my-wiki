const express = require('express');
const router = express.Router();
const Joi = require('joi');

/* 
  Database
  NoSQL의 형식
*/
const games = [
  { id: 1, title: "Warcraft" },
  { id: 2, title: "Diablo" },
  { id: 3, title: "Hearth Stone" }
];

/* 
  CRUD Operation
  Create   Read    Update  Destroy
  POST     GET     PUT     DELETE
*/

/* GET All */
router.get("/", (req, res) => {
  res.send(games);
});

/* GET */
router.get("/:id", (req, res) => {
  // id에 맞는 게임이 있는지 검사
  const game = getGame(games, parseInt(req.params.id));

  // 없으면 에러메세지 반환
  if (!game)
    return res
      .status(404)
      .send(`the game with given id(${req.params.id}) was not found`);

  // 있으면 보내준다.
  res.send(game);
});

/* POST */
router.post("/", (req, res) => {
  // 새로 작성한 내용의 유효성 검사
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.message);

  // 새로운 game을 등록한다.
  const game = {
    id: games.length + 1,
    title: req.body.title
  };
  games.push(game);

  // 등록한 game을 보내준다.
  res.send(game);
});

/* PUT */
router.put("/:id", (req, res) => {
  // id에 맞는 게임이 있는지 검사
  const game = getGame(games, parseInt(req.params.id));
  if (!game) {
    return res
      .status(404)
      .send(`the game with given id(${req.params.id}) was not found`);
  }

  // 새로 작성한 내용의 유효성 검사
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.message);

  // 수정
  game.title = req.body.title;
  res.send(game);
});

/* DELETE */
router.delete("/:id", (req, res) => {
  // games 에서 id 로 game 찾기
  const game = getGame(games, parseInt(req.params.id));
  // 없으면 404
  if (!game) {
    return res
      .status(404)
      .send(`Game with given id(${req.params.id}) is not found`);
  }

  // Delete logic 수행
  const index = games.indexOf(game);
  games.splice(index, 1);
  res.send(game);
});

const validateGame = game => {
  const schema = {
    title: Joi.string()
      .min(2)
      .required()
  };
  return Joi.validate(game, schema);
};

const getGame = (games, id) => games.find(game => game.id === id);

module.exports = router;