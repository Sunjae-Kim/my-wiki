# Sync-Async

[TOC]

**비동기 작업 예시)** `setTimeout`동작이 끝날때까지 기다리지 않고 다음 동작을 수행하는 함수

```js
console.log('메인코드 진행중 ...');
console.log(getUser(1));
console.log('메인코드 계속 진행중 ...');

function getUser(id){
  const users = [
    { id: 1, gitHubID: 'neo'},
    { id: 2, gitHubID: 'john'}
  ]
  setTimeout(()=>{
    console.log('Reading Data from Database');
    return users.find(user => user.id === id);
  }, 2000);
}
/*
메인코드 진행중 ...
undefined
메인코드 계속 진행중 ...
Reading Data from Database
*/
```

> `getUser`에서 반환이 될 값을 바로 받는 방법은 없는가?

---

## 1. Callback

### 1.1 비동기 문제 해결

```js
console.log('메인코드 진행중 ...');
getUser(1, user => {
  console.log(user);
});

function getUser(id, callback){
  const users = [
    { id: 1, gitHubID: 'neo'},
    { id: 2, gitHubID: 'john'}
  ]
  setTimeout(()=>{
    console.log('Reading Data from Database');
    const user = users.find(user => user.id === id);
    callback(user);
  }, 2000);
}
```

> `getUser`함수에서 callback 함수를 파라미터로 정의한 뒤에 비동기 처리인 `setTimeout`부분에서 data를 가져온 다음에 callback 함수를 실행하도록 설계.
>
> `getUser` 의 두번째 parameter로 return받은 `user`의 값을 handling 하는 작업을 수행

---
### 1.2 Practice

위의 예시에 추가하여 Github의 모든 repository를 가져오는 함수를 만들고 가져오는 시간이 1.5초가 걸린다고 하고 데이터가 정상적으로 넘어오는걸 확인한 후에 출력하는 함수를 만들어보자.

```js
getUser(1, user => {
  getRepos(user.id, repos => {
    console.log(repos);
  });
});

function getRepos(userID, callback) {
  console.log(`Finding [ ${userID} ]'s all github repo`);
  setTimeout(()=>{
    callback(['TIL', 'ES6', 'Express']);
  }, 1500);
}
```

---

### 1.3 Callback 지옥

- 콜백에 콜백이 반복되는 함수

  ```js
  console.log('메인코드 진행중 ...');
  getUser(1, user => {
    getRepos(user.id, repos => {
      getCommits(repos[0], commits => {
        console.log(commits);
      });
    });
  });
  console.log('메인코드 계속 진행중 ...');
  ```


- 해결해보자

  ```js
  console.log('메인코드 진행중 ...');
  getUser(1, gRepos);
  console.log('메인코드 계속 진행중 ...');
  
  function gRepos(user){
    getRepos(user, gCommits);
  }
  
  function gCommits(repos){
    getCommits(repos[0], displayCommits);
  }
  
  function displayCommits(commits){
    console.log(commits);
  }
  ```

  > 2번째 라인에서 1줄코드로 축약하긴 했지만 덕분에 함수가 난발하게 되었다.

​	

---

## 2. Promise

- 함수가 성공적으로 끝났는지 실패적으로 끝난는지 결과를 약속해주는 Class

- Promise에는 3가지의 상태가 있다.

	1. 대기중
	2. 성공
	3. 실패

### 2.1 사용하는 방법

- Promise에는 2가지 매개변수가 들어가게 된다.

  - **resolve** : 성공 시 `resolve`안의 내용이 반환이 되며 `then` 의 매개변수로 받게 된다.
  - **reject** : 실패 시 `reject`안의 내용이 반환이 되며 `catch` 의 매개변수로 받게 된다.

  ```js
  const promise = new Promise((resolve, reject) => {
    const number = Math.floor(Math.random() * 100);
    // async 한 작업 중...
    if (number % 2 === 1) resolve({ id: 1, email: "kimsj9484@gmail.com" });//성공
    else reject(new Error('Error...')); // 실패
  });
  
  promise
    .then(user => console.log(user))
    .catch(error => console.error(error));
  ```

  > `Error` 객체를 생성하고 출력해줘야 어떤 에러가 발생했는지 확실하게 인지할 수 있게 해준다.

---

### 2.2 Hell to Promise

- Callback 지옥을 Promise를 이용해서 조금 완화시킬 수 있다.

  ```js
  console.log("메인코드 진행중 ...");
  
  getUser(1)
    .then(user => getRepos(user))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch(error => console.log(error.message));
  
  function getUser(id) {
    console.log("Reading Data from Database");
    const users = [{ id: 1, gitHubID: "neo" }, { id: 2, gitHubID: "john" }];
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(user => user.id === id);
        // Ready!!
        if (user) resolve(user);
        else reject(new Error(`Cannot find the user with id(${id})`));
      }, 2000);
    });
  }
  
  function getRepos(user) {
    console.log(`Finding [ ${user.gitHubID} ]'s all github repo`);
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const repos = ["TIL", "ES6", "Express"];
        const number = Math.floor(Math.random() * 100);
        // async 한 작업 중...
        if (number % 2 === 1) resolve(repos);
        else reject(new Error(`Cannot find Repos with userID(${user.id})`));
      }, 1500);
    })
  }
  
  function getCommits(repo) {
    console.log(`Getting all Commits in [ ${repo} ]`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["Init", "Finish"])
      }, 1000);
    })
  }
  ```

  > 에러는 어느 과정에서 일어나도 마지막 `catch` 로 들어가서 에러를 출력시켜줄 것이기 때문에 `then` 뒤에 매번 작성할 필요는 없다.

---

### 2.3 `all`, `race`

- **예시)**

  3가지의 서로 반환되기까지 시간이 다른 Promise를 만들고 테스트를 진행해보자.

  ```js
  const p1 = new Promise((resolve, reject) => {
    console.log('Fetching from Bank1');
    setTimeout(()=>{
      const response = { bank: 1, delayed: false};
      resolve(!response.delayed);
    }, 1000);
  });
  
  const p2 = new Promise((resolve, reject)=>{
    console.log('Fetching from Bank2');
    setTimeout(()=>{
      const response = { bank: 2, delayed: true};
      resolve(!response.delayed);
    }, 1400);
  });
  
  const p3 = new Promise((resolve, reject)=>{
    console.log('Fetching from Bank3');
    setTimeout(()=>{
      const response = { bank: 3, delayed: false};
      resolve(!response.delayed);
    }, 2000);
  });
  
  ```

- `Promise.all`

  모든 Promise들이 다 반환되고 난 뒤에결과값을 배열로 반환하는 함수

  ```js
  Promise.all([p1,p2,p3])
    .then(result => console.log(result))
    .catch();
  ```

  > Fetching from Bank1
  > Fetching from Bank2
  > Fetching from Bank3
  > [ true, false, true ]

- `Promise.race`

  ```js
  Promise.race([p1,p2,p3])
    .then(result => console.log(result))
    .catch();
  ```

  > Fetching from Bank1
  > Fetching from Bank2
  > Fetching from Bank3
  > true

---

## 3. Async-Await

#### 3.1 Learn

- 위의 예시들에서 우리가 정말로 원했던 코드의 모양은 아래와 같을 것이다.

  ```js
  const user = getUser(1);
  const repos = getRepos(user.gitHubID);
  const commits = getCommits(repos[0]);
  console.log(commits);
  ```

  > 하지만 검색 결과는 모두 undefined가 될것이다.
  >
  > 이 Logic 그대로 우리가 원하는대로 사용할 수 있는 방법은 없을까?

- **using Async-Await**

  말그대로 비동기를 기다렸다가 수행하라는 코드로 아래와 같이 작성이 가능하게 된다.

  ```js
  async function run() {
      const user = await getUser(1);
      const repos = await getRepos(user.gitHubID);
      const commits = await getCommits(repos[0]);
      console.log(commits);
  }
  
  run();
  ```

  > function 앞에 async를 붙이고
  >
  > Promise 함수 앞에 await를 붙인다.

- **try-catch**

  Promise의 `then` 함수를 사용할 때와 마찬가지로 예외처리 코드를 추가해보자

  ```js
  async function run() {
    try{
      const user = await getUser(1);
      const repos = await getRepos(user.gitHubID);
      const commits = await getCommits(repos[0]);
      console.log(commits);
    }catch(error){
      console.error(error);
    }
  }
  
  run();
  ```

#### 3.2 Practice

- Get Lucky Numbers

  로또 API를 통해서 럭키 넘버를 뽑아보자!

  ```js
  const http = require("http");
  
  function getLottoData(drwNo){
    const url = `http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
  
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        let buff = '';
        
        res.on('data', chunk => {
          buff += chunk;
        });
  
        res.on('end', () => {
          if(buff) resolve(JSON.parse(buff));
          else reject(new Error('error occured'));
        });
      });
    });
  }
  
  function findLuckyNumbers(lottoData={}){
    for ( const [key, value] of Object.entries(lottoData)) {
      console.log(`${key} : ${value}`);
    }
  }
  
  getLottoData(800)
    .then(result => findLuckyNumbers(result))
    .catch(error => console.error(error));
  ```


























































