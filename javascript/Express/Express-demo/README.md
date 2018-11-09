# Express Demo



## 1. Getting Started

### 1.1 Installation

`$ npm i express`

node몬이 잘 설치 되어있는지 확인, 설치되지 않았다면 설치

```bash
$ npm -g ls --depth=0
...
+-- nodemon@1.18.6
```

> 확인되지 않으면 `$ npm i -g nodemon`



### 1.2 Simple Demo(HTTP)

HTTP를 이용한 서버생성

```js
const http = require('http');

const data = {
  user : 'sunjae',
  admin : true
}

const server = http.createServer((req,res) => {
  if(req.url === '/'){
    res.write('Welcome!')
    res.end();
  }

  if(req.url === '/api'){
    res.write(JSON.stringify(data));
    res.end();
  }
})

server.listen(3000);
console.log('Listening on port 3000');
```

> 구시대의 유물은 사용하지 않도록 하자 		- 유태용 강사



## 2. Express Demo

위의 HTTP와 동일한 코드를 작성

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Happy Hacking!");
});

app.get("/api", (req, res) => {
  const data = {
    name: "sunjae",
    age: 25,
    admin: true
  };
  res.send(data);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### 2.1 Method

#### GET

#### POST

### 2.2 Nodemon

서버를 끄지않고 수정한 script파일을 실시간으로 반영하기위한 모듈

### 2.3 PORT
포트 번호는 한개로 고정시켜두는건 좋지 않다.

어떠한 상황이 올지 모르기 때문에 process.env의 PORT변수를 통해 받아온다.

그게 어려울 때 3000PORT를 사용하는 코드를 작성하도록 하자

```js
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

### 2.4 Request

`req.params`

`req.query`











### ETC.

사용중인 포트가 정상 종료되지 않아서 계속 돌고있어서 강제종류 해야할 때

``` bash
$ ps aux | grep 'nodemon' 		# PID번호를 기억
$ kill -9 <PID> 				# 프로세스 종료
```





