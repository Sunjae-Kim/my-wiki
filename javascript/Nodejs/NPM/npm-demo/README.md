# Node Packge Manager

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

> ` "underscore": "^1.9.1" `  Major.Minor.Patch 기준;
>
> ^(carrot)이 명시되어 있으면 :
>
> - Semantic Versioning 기준으로 version control이 되고있는 것
>
> - `"^1.x.x"` version으로 불러오게 됨 [ Major코드 수정 부분만 따르고 나머지는 알아서 설치가 됨 ]
> - `"~1.9.1"` 은 `"1.9.x"` version으로 설치가 됨



#### 1.2.2 Global Flag

`$ npm install -g nodemon` : 프로젝트 내 파일에 수정이 일어났을경우 자동으로 서버를 재시작시키는 모듈

> Global 



#### 1.2.3 Development Flag

`$ npm install -D jshint` : 개발할 때 



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
