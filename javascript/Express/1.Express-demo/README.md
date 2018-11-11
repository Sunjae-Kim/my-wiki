# Express Demo

## 1. Installation

### 1.1 Express :

`$ npm install --save express` 로 간단히 설치를 진행한다.

**package.json** 파일 "dependencies"에 express가 확인되면 설치완료

**Link** : <https://expressjs.com/ko/>

<br>

### 1.2 Nodemon :

파일에 변경이 확인되었을 시 자동으로 Node **서버를** **재시작** 해주는 아주 고마운 모듈이다.

전역으로 사용할 모듈이기 때문에 꼭 아래와 같이 깔려있는지 확인 후 없을 시 `$ npm i -g nodemon` 명령어로 설치하도록 하자.

```bash
$ npm -g ls --depth=0
...
+-- nodemon@1.18.6 			# 이렇게 nodemon이 나와야 정상적으로 깔린 것!
```

<br>

<span style="color:red">**유의사항**</span> : 사용중인 포트가 정상 종료되지 않아서 계속 돌고있어서 강제종류 해야할 때

``` bash
$ ps aux | grep 'nodemon' 		# PID번호를 기억
$ kill -9 <PID> 			# 프로세스 종료
```

<br>

## 2. Examples

### 2.1 Simple Demo(HTTP)

구시대에 어떻게 HTTP를 이용하여 서버를 생성하였는지 확인해보자.

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

> 아주 간단하게 작동이 되는지만 확인한 코드로 엄청 짧고 간결해 보일수 있으나 수많은 예외처리와 단순한 데이터의 전송도 아주 복잡하게 구현이 될 수 있기 때문에 사용하지 않도록 한다.

<br>

### 2.2 Express Demo

Express를 이용해서 위의 HTTP와 동일한 코드를 작성

```js
const express = require("express");			// 설치한 Express를 호출한다.
const app = express();					// 불러온 Express를 통해 app 객체를 생성

app.get("/", (req, res) => {				// app객체를 통해서 라우터를 생성한다.
  res.send("Happy Hacking!");				// res 객체로 client 에게 메세지 전송
});

app.get("/api", (req, res) => {
  const data = { name: "sunjae",  age: 25, 
                admin: true };
  res.send(data);					// res 객체로 client 에게 데이터 전송
});

app.listen(3000, () => {				// 3000포트로 client의 요청을 들음
  console.log('Listening on port 3000');
});
```

<br>

## 3. Method

Client가 사용자에게 요청을 보내는 방식은 크게 2가지가 있다.

위 예제에는 app이라는 라우터를 통해 <span style="color:red">**GET**</span> 방식으로 요청을 받았는데 말 그대로 사용자가 get, 즉 데이터를 받는 형식의 요청이다.

그 외 대표적으로 <span style="color:red">**POST**</span>가 있는데 이는 사용자가 서버에 post, 데이터를 등록하겠다는 요청이다.

이 외에도 용도에 따라 DELETE, PUT 등 다른 요청들은 [Express Basic](https://github.com/Sunjae-Kim/TIL/tree/master/javascript/Express/Express-basic)에서 더 자세히 알아보도록 하자.

<br>

## 4. PORT
포트 번호는 한개로 고정시켜두는건 좋지 않다.

해당 포트에서 어떤 상황 발생할지 모르기 때문에 서버 환경에서 port를 찾아서 할당하도록 하자.

```js
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

> `process.env` 객체에서 PORT를 받아온다. 그게 어려울 때 3000번 포트를 사용하도록 하자.
