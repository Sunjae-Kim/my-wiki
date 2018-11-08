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



### 1.2 Simple Demo

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

