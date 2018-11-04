#  Node.js

### why node.js?

서버를 만드는 수많은 개발 도구 중에서 굳이 node.js를 쓰는 이유는 3가지로 정리할 수 있다.

1. 비동기 입출력 (Non-blocking I/O)
2. 이벤트 기반 입출력 (Event Driven I/O)
3. 노드의 모듈

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

```js
# 3. 소스파일 하나에 모든 지원하는 기능이 포함되지 않고 아래와 같이 필요한 
#    모듈만 불러서 사용하면 되는 방식으로 코드의 양이 적어지고 코드가 복잡하지 않게 된다.
var module-1 = require('module-1');
var module-2 = require('module-2');
var module-3 = require('module-3');
```


