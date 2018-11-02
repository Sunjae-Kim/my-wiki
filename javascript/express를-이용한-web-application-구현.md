# [Express](https://expressjs.com/ko/)

## Getting Started

### Installation

`$ npm install --save express` 로 간단히 설치를 진행한다

package.json 파일 "dependencies"에 express가 확인되면 설치완료

<br>

### 기본 사용법

``` js
# Express 예제
const express = require('express'); 	    # Express를 불러온다.
const app = express(); 			    # 불러온 Express를 통해 객체를 생성

app.get('/', function(req, res){	    # app객체를 통해서 라우터를 생성한다.
    res.render('index'); 		    # root로 이동 시 index페이지를 보여주도록 설정
});

app.listen(8080);			    # 8080(default)포트를 사용하면 80포트로 자동 바인딩
```

<br>

#### URL을 통한 값 받기

```js
# URL을 통한 값 받기
app.get('/hello/:name', function(){		# :name 자리에 문자열을 파라미터로 받는다.
   const name = req.params.name;		# params를 통해 입력받은 값을 가져온다.
   res.send(`Hello ${name}`);			# 저장한 객체를 res를 통해 응답한다.
});
```

<br>

#### HTML의 form을 통한 값 받기

```js
# HTML의 form을 통한 값 받기
app.get('/send-data', function(){
   const data = req.query.data;			# query.<tag name>을 통해 form안의 내용을 가져온다. 
   res.send(`The data is ${data}`);
});
```

```html
<!-- /send-data로 데이터 전송하기 -->
<body>
    <form action="/send-data">
        <input type="text" name="data">
    </form>
</body>
```


<hr>

### Useful libraries

| Name       | Installation                      | Official Page             |
| ---------- | --------------------------------- | ------------------------- |
| Moment.js  | `$ npm install --save moment`     | http://momentjs.com/      |
| EJS        | `$ npm install --save ejs`        | http://ejs.co/            |
| Underscore | `$ npm install --save underscore` | https://underscorejs.org/ |

#### EJS

```js
#app.js
app.set('view engine', 'ejs');			# view엔진을 EJS로 설정
app.get('/test',function(req, res){
    const test = 'test';
    res.render('test', {_test : test});	        # test라는 상수를 test.html로 전송
});
```

```html
<!-- test.html -->
<body>
    <h1> <%= _test %> </h1>			<!-- jsp tag로 값을 사용할 수 있게 된다. -->
</body>
```
