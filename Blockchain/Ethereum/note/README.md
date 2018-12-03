# Ethereum DApp

## 1. Install

- **EVM**(Ethereum Virtual Machine) **Complier**를 깔도록 하자.

  ```bash
  $ npm install solc@0.425
  ```

- Visual Code에서 Solidity 언어의 syntax 에러 등을 잡아주는 **Solidity**를 설치하도록 하자

- `.sol` 파일에서 solidity 버전을 선언해주는 첫번째 라인에서부터 에러가 나는것을 확인할 수 있다.

  ```solidity
  pragma solidity ^0.4.25; // line-break error
  ```

  해결방법은 setting에 들어가서 **setting.json** 파일에 아래의 코드를 추가하도록 하자.

  ```json
  "solidity.soliumRules": {
      "linebreak-style": "windows"
  }
  ```

## 2. Note.sol

### 2.1 Compile

- Solidity 파일을 `fs & path` 모듈로 text 형식으로 불러오자.

- `solc` complier를 통해서 compile을 진행한다.

- contract의 `bytecode`와 `interface`를 가져온다.

  ```js
  /* Import Modules */
  const fs = require('fs');
  const path = require('path');
  const solc = require('solc');
  
  /* path 와 fs 를 통해 Note.sol 의 내용을 가져온다. */
  const filePath = path.resolve(__dirname, 'Note.sol')
  const note = fs.readFileSync(filePath, { encoding: 'utf8' });
  
  /* 
    Solidity file 을 complie 한다. 
    Remix 의 contract details에서 확인할 수 있는 내용들이 출력된다.
  */
  const source = solc.compile(note, 1);
  
  /* Complier 한 source에서 필요한 data 추출 */
  const bytecode = source.contracts[':NoteManager'].bytecode;
  const interface = source.contracts[':NoteManager'].interface;
  ```

### 2.2 Deploy

#### - Install Modules

- **Web3**: Ethereum Network와 interact한다.

  ( Windows 환경에서는 web3가 바로 설치가 되지 않는다. window build tools 를 깔아서 환경설정을 해주자. )

  ```bash
  $ npm install --global --production windows-build-tools
  ```

- **HDWalletProvider**: 12 개의 seed words 를 생성해 private 키를 생성한다.

  ```bash
  $ npm install truffle-hdwallet-provider
  ```


#### - deploy.js

```js
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

// 배포하기 위한 컨트랙 컴파일 결과물을 가져온다.
const { bytecode, interface } = require('./compile');

// 나의 계정에서 Infura를 통해서 deploy를 할 것이다.
const provider = new HDWalletProvider(
  '12개의 memonic words', 
  'Infura API'
);

// Ethereum 서버와 연동하자.
const web3 = new Web3(provider);

const deploy = async () =>{
  const [ account ] = await web3.eth.getAccounts();
  console.log(account);

   const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['Happy Hacking'] })
    .send({ from: account, gas: '1000000', gasPrice: web3.utils.toWei('2', 'gwei')});
    console.log(result.options.address);
  }

deploy();
```



---



### 2.3 TEST

#### Mocha: (truffle default test framework)

- 아래 command로 설치하자 

  ```bash
  $ npm install mocha
  $ npm install ganache-cli		#Blockchain server
  ```

- Agile 방법론에서는 TDD 방식을 많이 사용한다.

- TDD == Test Driven Development

  > - 실제 기능 개발 전에 TEST를 먼저 짠다.
  > - TEST를 돌리면서 오류를 확인한다.
  > - 한개씩 오류를 수정한다.
  > - 모듈화된 기능 ( view -> component )
  > - Microservice Architecture

- **test.js**

  ```js
  const assert = require('assert');
  
  class Car {
    prak(){
      return '주차';
    }
  
    drive(){
      return '붕붕';
    }
  
  };
  
  const car = new Car();
  
  // 내가 어떤 모듈을 테스트 할 건지
  describe('Car class can...', () => {
  
    // 그 모듈이 무엇을 할 것인지 : 
    it('park', () => {
      assert.equal(car.prak(), '주차');
    });
  
    it('drive', () => {
      assert.equal(car.drive(), '붕붕');
    })
  });
  ```

  ```bash
  $ npm run test
  
  > note@1.0.0 test C:\Users\kimsj\Git\TIL\Ethereum\note
  > mocha
  
    Car class can...
      √ park
      √ drive
  
    2 passing (13ms)
  ```

  <https://github.com/djohnkang/multi-dapp>