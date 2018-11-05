#  Node.js

### why node.js?

서버를 만드는 수많은 개발 도구 중에서 굳이 node.js를 쓰는 이유는 3가지로 정리할 수 있다.

1. 비동기 입출력 (Non-blocking I/O)
2. 이벤트 기반 입출력 (Event Driven I/O)
3. 노드 패키지 매니저 (Node Package Manager)

##### Example

``` js
# 이벤트 함수 구현
function doShow(contents){							
    console.log(`Contents : ${contents}`);
}

# 1. read()를 실행한 뒤 결과를 기다리지 않고 바로 daAdd()를 실행 
# 2. read()가 끝나고 결과 'contents'가 나오면 구현해둔 이벤트 함수 doShow()가 실행됨
file.read('a.txt', function(contents){				
    doDhow(contents);								
})

var result = doAdd(10,10);
```

``` bash
# 3. node를 사용하는 Repository 최상위 폴더에 init을 한다.
$ npm init

# package.json 파일이 생성된다.
$ cat package.json
{
  ...
  "license": "ISC"
}

# npm install --save <PackageName> 을 통해 module을 설치하고 package.json에서 확인한다.
$ npm install --save underscore
$ cat package.json
{
  ...
  "license": "ISC",
  "dependencies": {		# dependencies에서 설치한 module을 확인할 수 있다.
    "underscore": "^1.9.1"
  }
}
```

```js
# 아래 코드처럼 호출해서 사용하면 되는 방식으로 코드의 양이 적어지고 코드가 복잡하지 않게 된다.
const _ = require('underscore');
const number = _.range(1,46);
```
