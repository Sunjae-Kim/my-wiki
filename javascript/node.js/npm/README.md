# Node Packge Manager
- [Node Packge Manager](#node-packge-manager)
  - [1. Getting Started](#1-getting-started)
    - [1.1 Initiating](#11-initiating)
    - [1.2 Installation & Removal](#12-installation--removal)
      - [1.2.1 Semantic Versioning](#121-semantic-versioning)
      - [1.2.2 Global Flag](#122-global-flag)
      - [1.2.3 Development Flag](#123-development-flag)
    - [1.3 Node_modules Directory](#13-nodemodules-directory)
  - [2. Publishing](#2-publishing)
    - [2.1 Initiating NPM](#21-initiating-npm)
    - [2.2 Building Module](#22-building-module)
    - [2.3 Publishing Module](#23-publishing-module)
        - [login](#login)
        - [Publish](#publish)
    - [2.4 Version Up](#24-version-up)

NPM(Node Package Manager)를 통해 필요한 모듈만 호출해서 사용하게 되면 개발 과정에서 코드의 양이 적어지고 코드가 복잡하지 않게 된다.

Website: <https://www.npmjs.com/>

## 1. Getting Started

### 1.1 Initiating

```bash
# node를 사용하는 Repository 최상위 폴더에 init을 한다.
$ npm init

# 아래와 같은 package.json 파일이 생성된다.
$ cat package.json
{
  ...
  "license": "ISC"
}
```

> package.json 파일을 설치하는게 모두인 과정



### 1.2 Installation & Removal

```bash
# npm install <PackageName> 을 통해 module을 설치하고 package.json에서 확인한다.
$ npm install underscore

# 설치완료 후 package.json 파일의 dependencies에 update가 된다.
$ cat package.json
{
  ...
  "license": "ISC",
  "dependencies": {		# dependencies에서 설치한 module을 확인할 수 있다.
    "underscore": "^1.9.1" 
  }
}

# 삭제하면 마찬가지로 package.json에서 확인할 수 있다.
$ npm remove underscore
```

> `$ npm install --save <PackageName>`의 `--save` command로 package.json파일에 update하여야 했으나 최신 업데이트 이후 `--save` 없이 가능하게 되었다.



#### 1.2.1 Semantic Versioning

` "underscore": "^1.9.1" `  Major.Minor.Patch 기준;

> ^(carrot)이 명시되어 있으면 :
>
> - Semantic Versioning 기준으로 version control이 되고있는 것
> - `"^1.x.x"` version으로 불러오게 됨 [ Major코드 수정 부분만 따르고 나머지는 알아서 설치가 됨 ]
> - `"~1.9.1"` 은 `"1.9.x"` version으로 설치가 됨

> - Major : 하위호환되지 않는 변화가 추가될 때 반드시 올라가야 한다. 이는 패치 수준과 작은 수준의 변화를 포함할 수 있으나, 주요 버전이 올라가면 작은 버전과 패치 버전은 꼭 0이 되어야 한다.
>
> - Minor : 새로운 기능이 추가되었지만 기존의 공개 API가 하위호환되고 있을 때 올라간다. 공개 API가 하나 이상 deprecated될 시에도 올라가야 한다. 부가적인 새 기능이나 개선이 내부 코드 (private code)에 있을 시에도 올릴 수 있다. 이는 패치 수준의 변화를 포함할 수 있으나, 작은 버전이 올라가면 패치 버전은 꼭 0이 되어야 한다.
>
> - Patch : 하위호환을 하지만 버그 수정이 있을 때 올라간다. 버그 수정은 내부적으로 잘못 처리되고 있는 것을 고치는 것을 의미한다.
>
> 출처 : <https://spoqa.github.io/2012/12/18/semantic-versioning.html>



#### 1.2.2 Global Flag

`$ npm install -g nodemon` : 프로젝트 내 파일에 수정이 일어났을경우 자동으로 서버를 재시작시키는 모듈

> Code내부에서 사용하지 않고 command line내에서만 주로 사용하는 모듈을 설치할 때 명시

#### 1.2.3 Development Flag

`$ npm install -D jshint` : 에러메세지를 더 직관적으로 이해하기 좋게 출력해주는 모듈

> 실제 플랫폼이 수행될 때 전혀 필요 없으며 단지 개발에 도움을 주기위한 모듈을 설치할 때 명시
>
> `dependencies`가 아닌 `devDependencies`에 별도로 설치된다.



### 1.3 Node_modules Directory

> 굉장히 많은 모듈들이 다운로드 되어있는 폴더
>
> 해당 폴더에는 300개 이상의 파일이 들어있으며 이미 package.json에 어떤 module들이 있는지 확인가능
>
> 심지어 package.json과 package-lock.json 파일만 있으면 `$ npm i`를 통해서 모든 module을 자동으로 install 할 수 있다.
>
> 프로젝트를 시작할 때 .gitnore파일을 생성하여 `node_modules/` 를 추가함으로서 git에 올리지 않도록 하자.
>
> 만약 배포를 목적으로 하여 받는사람이 사용하는 플랫폼이라면 위 내용을 무시하도록 하자.

<br>

## 2. Publishing

### 2.1 Initiating NPM

배포할 모듈을 만들 패키지에서 `$ npm init`으로 초기화한다.

`package name` 내용에 배포할 모듈 이름을 설정하고 나머지 내용들도 입력하도록 한다.

 ``` json
package name: (npmpublish) multicampus
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author: sunja-kim
license: (ISC)
 ```



### 2.2 Building Module

index.js 가 entry point로 설정이 되어있는걸 확인할 수 있다.

index.js에서 배포할 모듈의 기능들을 작성하도록 한다.

```js
module.exports = {
  startDate(){
    return "2018.04.31";
  },
  classCheck(roomNumber){
    if(roomNumber === 1004){
      return 'blockchain';
    } else{
      return '~_~';
    }
  },
}
```

> Object의 형태로 구조적이게 정리하자.



### 2.3 Publishing Module

만든 모듈을 배포하기 전 npm에 로그인을 해야한다.

아이디가 없다면 [링크](https://www.npmjs.com/)를 통해 회원가입을 하도록 한다.

##### login

``` bash
$ npm login
Username: <Your ID>
Passsword: <Your Password>
Email: (this IS public) <Your Email>
Logged in as <ID> on https://registry.npmjs.org/.
```

> 회원 가입 후 email 인증을 반드시 하도록 하자.
>
> 하지 않으면 publish 과정에서 오류메세지를 확인할 수 있을것이다.

##### Publish

```bash
$ npm publish
npm notice
npm notice package: multicampus@1.0.0
npm notice === Tarball Contents ===
npm notice 210B package.json
npm notice 144B index.js
npm notice === Tarball Details ===
npm notice name:          multicampus
npm notice version:       1.0.0
npm notice package size:  373 B
npm notice unpacked size: 354 B
npm notice shasum:        4d2dd29eb0b7e31fff4a8ffdcb60190f6cf45993
npm notice integrity:     sha512-sWe3TEJyaUXRS[...]4BOGs+zI8NSaQ==
npm notice total files:   2
npm notice
+ multicampus@1.0.0
```

> `$ npm install multicampus` 를 통해서 어디서나 사용할 수 있게 된다.



### 2.4 Version Up

1.2.1 에서 설명한 Semantic Versioning을 따른다.

index.js 에서 버전 없 작업을 수행한 뒤 `$ npm version <versioning>` 을 하면 자동으로 version up 된다.

그리고 버전업 된 버전을 다시 publish 하면 끝

```bash
$ npm version minor
v1.1.0
$ npm publish
npm notice
npm notice package: multicampus@1.1.0
npm notice === Tarball Contents ===
npm notice 210B package.json
npm notice 183B index.js
npm notice === Tarball Details ===
npm notice name:          multicampus
npm notice version:       1.1.0
npm notice package size:  378 B
npm notice unpacked size: 393 B
npm notice shasum:        fabb56a27d3c7696d4c0d0ad60ed5d41d2e5199e
npm notice integrity:     sha512-3wRgrlLgZZD1v[...]p5y5k4VqLUsLg==
npm notice total files:   2
npm notice
+ multicampus@1.1.0
```
