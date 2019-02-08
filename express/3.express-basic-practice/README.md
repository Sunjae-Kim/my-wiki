# Express Basic Practice
- [Express Basic Practice](#express-basic-practice)
  - [1. JSON File Setting](#1-json-file-setting)
    - [1.1 파일생성](#11-%ED%8C%8C%EC%9D%BC%EC%83%9D%EC%84%B1)
    - [1.2 기본 데이터 채우기](#12-%EA%B8%B0%EB%B3%B8-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%B1%84%EC%9A%B0%EA%B8%B0)
  - [2. File System](#2-file-system)
    - [2.1 파일 저장 및 불러오기](#21-%ED%8C%8C%EC%9D%BC-%EC%A0%80%EC%9E%A5-%EB%B0%8F-%EB%B6%88%EB%9F%AC%EC%98%A4%EA%B8%B0)
    - [2.2 Promise](#22-promise)
  - [3. Refactoring](#3-refactoring)
    - [3.1 Save DB](#31-save-db)
    - [3.2 Utility](#32-utility)
      - [사용 예제](#%EC%82%AC%EC%9A%A9-%EC%98%88%EC%A0%9C)

[Express Basic](https://github.com/Sunjae-Kim/TIL/tree/master/javascript/Express/Express-basic) 에서 Express의 기본적인 사용법을 정리했다.

이전 내용에서는 Database를 Object 객체로 대신하여 사용하였다.

이번은 **<span style="color:red">Local JSON파일을 Database처럼 사용하여</span>** 요청과 응답이 있을 때마다 필요에 따라

실시간으로 불러오고 저장하는 코드를 추가하여 정리해볼 것이다.

<br>

## 1. JSON File Setting

### 1.1 파일생성

Workspace에서 Router를 설치할 **index.js** 파일을 만들고 Express Basic에서 정리한 대로 세팅한다.

추가로 `$ touch users.json` 명령어를 통해 **users.json** 이라는 데이터들을 저장할 파일을 만들자.

<br>

### 1.2 기본 데이터 채우기

회원가입 <u>CRUD Operation</u>을 구현할 예정으로 아래와 같은 기본데이터를 **user.json** 파일에 입력한다.

```json
{
  "details": [
    { "id": 1, "name": "라구원", "email": "example@gmail.com", "age": 27 },
    { "id": 2, "name": "김선재", "email": "kimsj9484@gmail.com", "age": 25 },
    { "id": 7, "name": "김다은", "email": "example2@gmail.com", "age": 27 }
  ],
  "SEQ": 7
}
```

> **users.details[index]** 를 통해서 사용자들의 상세정보로 접근할 수 있도록 하고 **users.SEQ**를 통해 계속 상승하는 primary key 값을 부여할 예정이다.

<br>

## 2. File System

기본 내장되어있는 Core Module인 **File System**을 사용해서 JSON파일을 불러오고 저장할 생각이다.

### 2.1 파일 저장 및 불러오기

오늘 사용될 함수는 가장 간단한 파일을 저장하고 파일을 불러오는 2개의 함수이다.

```js
const fs = require('fs');

// 파일을 불러온다.
fs.readFile("./users.json", { encoding: "utf8" }, (err, data) => {
    JSON.parse(data)
});

// 파일을 저장한다.
fs.writeFile("./users.json", JSON.stringify(data), err => {
    if (err) console.log(err);
});
```

> **불러오기 :**
>
> 불러온 데이터는 String type이기 때문에 Key : Value 형태로 접근이 불가능하다. 반드시 `JSON.parse()` 함수를 통해서 JSON 형식으로 변환해준 뒤에 데이터를 핸들링 하자.
>
> **저장하기 :**
>
> JSON 객체를 저장하게 되면 제대로된 정보가 들어가지 않고 `[Object object]` 가 저장되는 기이한 모습을 볼수 있기 때문에 반드시 `JSON.stringft()` 함수로 String type으로 변환해준 뒤 파일을 쓰도록 하자.

<br>

### 2.2 Promise

위 함수들은 비동기로 처리가 되기 때문에 사용자가 데이터에 대한 요청을 보냈을 때 파일을 전부 다 불러오기도 전에 다음 작업을 수행하며 사용자에게 응답 할 수도 있다. 

이러한 상황에는 비동기 함수가 완전히 수행이 되고 난 다음 작업을 해야하는데 그걸 가능하게 해주는 기능이 Promise 이다.

```js
const loadDB = () => {
  return new Promise( resolve => {
    fs.readFile("./users.json", { encoding: "utf8" }, (err, data) => {
      resolve(JSON.parse(data));
    });
  });
};
```

> 위와 같은 코드를 작성하면 `loadDB()`를 수행하고 난 뒤 `.then()` 함수를 통해 data를 받아서 사용할 수 있게된다. 아래의 예제를 확인하자.

<br>

``` js
app.get("/api/users/", (req, res) => {
  loadDB().then(users => {
    res.send(users.details);
  });
});
```

> 단순히 가지고 있는 모든 정보를 Client에게 전송하는 함수이다.
>
> 보이는 것과 같이 `then()` 함수의 파라미터로 `loadDB()` 안에서의 `resolve()`를 통해 넘겨준 JSON으로 변환된 데이터를 받을 수 있는 것을 확인 할 수 있다.

<br>

## 3. Refactoring

기능을 전부 구현한 뒤에 복잡하고 반복될 수 있는 코드들을 더 간결하게 정리를 해보도록 하자.

### 3.1 Save DB

```js
const saveDB = data => {
  fs.writeFile("./users.json", JSON.stringify(data), err => {
    if (err) console.log(err);
  });
};
```

> `loadDB()`와 같이 `saveDB()` 도 반복해서 사용이 되는 기능으로 함수 하나를 선언하여 사용하도록 하자.

<br>

### 3.2 Utility

CRUD Operation을 구현하게 되면 DB에서 1개의 객체를 꺼내거나 사용자가 보낸 정보의 유효성 확인을 해야하는 등 반복적으로 사용될 코드들이 많아진다.

이 함수들을 한개의 Object 안에 담은 뒤에 간편하게 꺼내서 사용하도록 하자.

```js
const utility = {
    // Array에서 id에 맞는 1개의 객체를 서치
  getOne(array, id) {
    return array.find(object => object.id === id);
  },
	
    // Client가 보낸 정보를 schema를 통해 유효성 검사
  validateTest(object, schema) {
    return Joi.validate(object, schema);
  },

    // 기존 객체에 새로운 객체의 정보를 덮어 씌우는 작업
  modify(object, newObject) {
    Object.keys(object).forEach((key, index) => {
      if (index !== 0) object[key] = newObject[key];
    });
  }
};
```

#### 사용 예제

```js
app.post("/api/users/", (req, res) => {
  loadDB().then(function(users) {
    // client가 보낸 정보의 유효성 검사
    const { error } = utility.validateTest(req.body, userSchema); // validateTest 사용
    if (error) return res.status(400).send(error.message);

    // 유효성 검사 통과 시 등록
    const user = new User(++users.SEQ);
    utility.modify(user, req.body); // modify 사용
    users.details.push(user);

    // 등록된 유저를 보내준다.
    res.send(user);
    saveDB(users);
  });
});
```