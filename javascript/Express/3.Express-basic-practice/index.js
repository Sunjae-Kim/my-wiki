/* Import modules */
const fs = require("fs");
const express = require("express");
const Joi = require("joi");

/* 
  Database:
  local의 users.json 파일을 DB처럼 활용하여
  CRUD operation이 수행 될 때 실시간으로 파일에 접근하여
  데이터를 불러오고 작업이 완료되면 저장한다.
*/
const loadDB = () => {
  return new Promise( resolve => {
    fs.readFile("./users.json", { encoding: "utf8" }, (err, data) => {
      resolve(JSON.parse(data));
    });
  });
};

const saveDB = data => {
  fs.writeFile("./users.json", JSON.stringify(data), err => {
    if (err) console.log(err);
  });
};

const userSchema = {
  name: Joi.string()
    .required()
    .min(1),
  email: Joi.string()
    .required()
    .email({ minDomainAtoms: 2 }),
  age: Joi.number()
    .integer()
    .required()
    .min(3)
    .max(150)
};

/* Configuration */
const app = express();
app.use(express.json());

/* CRUD operation */
/* GET */
app.get("/api/users/", (req, res) => {
  loadDB().then(function(users) {
    res.send(users.details);
  });
});

app.get("/api/users/:id", (req, res) => {
  loadDB().then(function(users) {
    // users에서 id로 user를 검색
    const user = utility.getOne(users.details, parseInt(req.params.id));
    // 없을 시 404
    if (!user)
      return res
        .status(404)
        .send(`User with the given id(${req.params.id}) was not found`);
    // 있을 시 전송
    res.send(user);
  });
});

/* POST */
app.post("/api/users/", (req, res) => {
  loadDB().then(function(users) {
    // client가 보낸 정보의 유효성 검사
    const { error } = utility.validateTest(req.body, userSchema);
    if (error) return res.status(400).send(error.message);

    // 유효성 검사 통과 시 등록
    const { name, email, age } = req.body;
    const user = {
      id: ++users.SEQ,
      name,
      email,
      age,
    };
    users.details.push(user);

    // 등록된 유저를 보내준다.
    res.send(user);
    saveDB(users);
  });
});

/* PUT */
app.put("/api/users/:id", (req, res) => {
  loadDB().then(function(users) {

    // users에서 id로 user를 검색
    const user = utility.getOne(users.details, parseInt(req.params.id));

    // 없을 시 404
    if (!user)
      return res
        .status(404)
        .send(`User with the given id(${req.params.id}) was not found`);

    // client가 보낸 정보의 유효성 검사
    const { error } = utility.validateTest(req.body, userSchema);
    if (error) return res.status(400).send(error.message);

    // Modify logic 수행
    utility.modify(user, req.body);

    // 수정된 유저를 보내준다
    res.send(user);
    saveDB(users);
  });
});

/* DELETE */
app.delete("/api/users/:id", (req, res) => {
  loadDB().then(function(users) {

    // users에서 id로 user를 검색
    const user = utility.getOne(users.details, parseInt(req.params.id));

    // 없을 시 404
    if (!user)
      return res
        .status(404)
        .send(`User with the given id(${req.params.id}) was not found`);

    // 있을 시 Delete logic 수행
    const index = users.details.indexOf(user);
    users.details.splice(index, 1);

    // 삭제된 유저의 정보 보내기
    res.send(user);
    saveDB(users);
  });
});

/* 
  Utility:
  범용적으로 쓰일 수 있을 만한 함수들
  하나의 object 안에 담아서 관린한다.
*/
const utility = {
  getOne(array, id) {
    return array.find(object => object.id === id);
  },

  validateTest(object, schema) {
    return Joi.validate(object, schema);
  },

  modify(object, newObject) {
    Object.keys(object).forEach((key, index) => {
      if (index !== 0) object[key] = newObject[key];
    });
  }
};

/* Setting Port */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
