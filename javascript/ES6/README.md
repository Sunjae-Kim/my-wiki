# ES6 New Features

[**ES6 New Features**](#es6-new-features)

​	[1. Getting Started](#1-getting-started)

​	[2. Array Helper Method](#2-array-helper-method)

​	[3. Additional Features](#3-additional-features)

## 1. Getting Started

### 1.1 ES6

- <u>ES6</u>는 <u>ECMAScript 6</u> 또는 <u>ECMAScript 2015</u> 라고도 알려져있다.

- Javascript는 ES5 표준을 의미하며 모든 브라우저에서 안전하게 동작한다.
- ES6는 2015년의 새로운 버전의 JS로 많은 편리한 문법 등이 지원되나 모든 브라우저에서 동작하지는 않는다.

### 1.2 Babel

- Babel은 JS의 Complier로 위의 문제를 해결한다.

- Babel의 주요 기능은 ES6의 편리하고 간결한 문법을 그대로 사용하도록 해주는 것이다. 
- 일부 브라우저에서 지원이 되지 않는 ES6의 문법을 자동으로 안전한 ES5의 문법으로 변환하여 호환성 문제를 해결한다.

---

## 2. Array Helper Method

### 2.1 `forEach`

- `for`

  ```js
  var colors = ['red', 'blue', 'green'];
  for(var i = 0; i < colors.length; i++){
    console.log(colors[i]);
  }
  ```

- `forEach`

  변수 i를 통한 루프 핸들링을 하지 않아도 된다는게 가장 큰 장점이다. 

  index의 값이 필요하다면 매개변수로 index를 추가하여 함수 내 사용도 가능하다.

  ```js
  var colors = ['red', 'blue', 'green'];
  colors.forEach(function(color){
    console.log(color);
  }) 
  ```

---

### 2.2 `map`

- `for`

  ```js
  var numbers = [1,2,3];
  var doubleNumbers = [];
  for(var i = 0; i < numbers.length; i++){
    doubleNumbers.push(numbers[i] * 2);
  }
  ```

- `map`

  배열 내부의 원소들 하나하나에 연산을 하며 연산된 원소들로 새로운 array를 반환해주는 함수이다. 

  ```js
  var numbers = [1,2,3];
  var doubleNumbers = numbers.map(function(number){
    return number * 2;
  })
  ```

---

### 2.3 `filter`

- **Data**

  ```js
  var products = [
    {name: 'banana', type: 'fruit'},
    {name: 'carrot', type: 'vegetable'},
    {name: 'apple', type: 'fruit'},
    {name: 'eggplant', type: 'vegetable'},
    {name: 'tomato', type: 'fruit'},
  ];
  ```

- `for`

  새로 담을 배열을 따로 선언하고 내부에서 제어문으로 조건에 맞는 값만 새 배열에 담는 과정

  ```js
  var fruits = [];
  for(var i = 0; i < products.length; i++){
    if(products[i].type === 'fruit'){
      fruits.push(products[i]);
    }
  }
  ```

- `filter`

   코드 한줄로 배열의 선언 및 조건에 맞는 값들로 배열을 채우는 기능을 수행

   ```js 
   var vegetables = products.filter(product => product.type === 'vegetable');
   ```

- **Advanced**

   Filter와 반대기능을 하는, 부합하지 않는 변수만 찾는 함수를 구현해보자.

   ```js
   var numbers = [10,20,30];
   
   function reject(array, iterFunction){
     return array.filter(function(element){
       return !iterFunction(element);
     });
   }
   
   var lessThan15 = reject(numbers, number => number > 15)
   ```

---

### 2.4 `find`

- **Data**

  ```js
  var users = [
    { name: 'Tony Stark' },
    { name: 'Steve Rogers' },
    { name: 'Thor' },
  ];
  ```

- `for`

  찾을 변수 1개를 선언하고 i변수를 이용한 포루프와 제어문으로 찾은 뒤 break까지 하여 빠져나가는 과정

  ```js
  var user;
  
  for(var i = 0; i < users.length; i++){
    if(users[i].name === 'Tony Stark'){
      user = users[i];
      break; // 찾는 순간 for문에서 벗어남
    }
  };
  ```

- `find`

  동일한 동작을 1줄 코드로 수행

  ```js
  var user = users.find(user => user.name === 'Tony Stark');
  ```
  
- **Advanced**

  Object의 배열에서 정해진 조건에 맞는 Object를 찾는 기능을 구현해보자.

  ```js
  var laders = [
    { id: 1, height: 20 },
    { id: 3, height: 25 },
  ];
  
  var findWhere = (array, standard) => {
    var key = Object.keys(standard);
    return array.find(function(element){
      return element[key] === standard[key]; 
    }) 
  }
  
  findWhere(laders, { height : 20 });
  ```

---

### 2.5 `every`, `some`

- **Data**

  ```js
  var computers = [
    { name: 'macbook_air', ram: 16 },
    { name: 'gram', ram: 8 },
    { name: 'series9', ram: 32 },
  ];
  ```

- `for`

  전체가 조건에 통과하는지, 일부는 조건에 통과하는지 for loop와 제어문으로 검사하는 과정

  ```js
  var everyComputersAvailable = true;
  var someComputersAvailable = true;
  
  for(var i = 0; i < computers.length; i++){
    var computer = computers[i];
    if(computer.ram < 16){
      everyComputersAvailable = false;
    }else{
      someComputersAvailable = true;
    }
  }
  ```

- `every`

  모든 조건이 통과해야만 true를 반환 `&&`

  ```js
  var everyLaptopAvailable = computers.every(function(computer){
    return computer.ram > 16;
  })
  ```

- `some`

  하나의 조건이라도 통과하면 true를 반환 `||`

  ```js
  var someLaptopAvailable = computers.some(function(computer){
    return computer.ram > 16;
  })
  ```

---

### 2.6 `reduce`

- `for`

  ```js
  var numbers = [10, 20, 30];
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  ```

- `reduce`

  reduce는 모든 Array Helper Method를 구현할 수 있을 정도로 활용도가 높다.

  Reduce 함수에는 다른 Helper Method들과는 다르게 첫번째 파라미터에서 핸들링 할 값 `acc` 을  function뒤의 매개변수로 초기화 할 수 있다. 

  마치 일반 포문에서 `sum` 변수를 `0` 값으로 초기화 해두고 값을 더해나가는 것과 동일하다.

  ```js
  var result = numbers.reduce(function(acc, number) {
    return acc + number;
  }, 0);
  ```

- **Advanced**

  괄호가 올바르게 열리고 닫혔는지 검사하는 알고리즘을 `reduce`를 이용해서 구현해보자.

  ```js
  function isGoodParens(string) {
    return !string.split('').reduce(function(acc, char){
      if(acc < 0) {
        return  acc;
      } else if (char ==='(') {
        ++acc;
      } else {
        --acc;
      }
      return acc
    }, 0);
  }
  ```

---


## 3. Additional Features

### 3.1 `const`, `let`

- `const`

  상수의 의미로 다시 재할당이 되지 않을 값 앞에 선언해준다.

  ```js
  const name = 'Tony Stark'
  name = 'Steve Rogers' // 에러 발생
  ```

- `let`

  변수의 의미로 값이 재할당될 수 있을 경우에 let을 사용한다.

  ```js
  let age = 25;
  age = 26; 
  ```

  > 일반적으로는 거의 모든 값에 `const`를 선언 해주고 필요에 따라서만 `let`으로 할당한다.

---

### 3.2 Template Strings

- **ES5 문법**

  ```js
  const name = 'Tom';
  const string = 'My name is' + name;
  ```

- **ES6 문법**

  ```js
  const name = 'Tom';
  const string = `My name is ${name}`; 
  ```

  > ``을 이용하여 string을 작성하고 안에 ${}으로 변수 및 함수 접근이 가능하다.

- **함수사용 예시**

  ```js
  const time = `The year is ${new Date().getFullYear()}`
  ```

---

### 3.3 Arrow Function

- **ES5 문법**

  ```js
  const add = function(a,b){
    return a+b;
  }
  ```

- **ES6 문법**

  function keyword를 없애고 'fat arrow' 를 사용하여 함수의 의미를 부여

  ```js
  const numbers = [1,2,3];
  const doubleNumbers = numbers.map( number => number * 2);
  ```

  > 1. return 문 밖에 없을 때 return 문 생략 가능
  > 2. parameter가 1개일 때 괄호 생략 가능

---

### 3.4 Object Literals

- **ES5 문법**

  ```js
  const saveFile = (url, data) => {
      $.ajax({ method: 'POST', url: url, data: data});
  }
  ```

- **ES6 문법**

  value가 key와 동일한 이름의 변수라면 생략이 가능하다.

  ```js
  function saveFile(url, data) {
      $.ajax({ url, data, method: 'POST' });
  }
  ```

---

### 3.5 Default Function Arguments

- **ES5 문법**

  JAVA와는 달리 parameter가 달라도 똑같은 이름의 함수를 호출

  ```js
  function makeRequest(url, method){
    if(!method){
      method = 'GET';
    }
  }
  makeRequest('http://hphk.io/')
  ```

- **ES6 문법**

  method 파라미터가 없는경우 default를 설정하는 방법

  ```js
  function makeRequest(method='GET', url){
    doSomeThing(method, url);
  }
  ```

  > 위와 같은 경우에는 parameter로 `method`가 들어오지 않을 경우 GET 방식으로 요청이 되도록 기본 설정을 해두는 코드이다.

---

### 3.6 Rest and Spread Operator

- **Rest**

  정해진 수량의 파라미터로만 함수를 수행하던 기존과는 달리 한번에 다량의 파라미터를 받는 함수를 구현하는게 가능해졌다.

  ```js
  const addAll = (...numbers) => {
    return numbers.reduce( (acc, number) => (acc + number), 0);
  }
  ```

- **Spread**

  '펼치다'는 말 그대로 배열을 펼쳐서 배열을 손쉽게 합칠수 있게 되었다.

  ```js
  const defaultColors = ['red', 'green', 'blue'];
  const myColors = ['black', 'navy', 'gold'];
  const iPhoneColors = ['rose gold', 'space gray']
  
  const palette = ['brown', ...defaultColors, ...myColors, ...iPhoneColors];
  ```

  > 배열 뿐만 아니라 다른 원소도 함께 합칠 수 있다.

- **Advanced**

  milk가 반드시 shopping list에 있어야 하는 경우를 구현해보자.

  ```js
  const showShoppingList = (...items) => {
    if(items.indexOf('milk' < 0)){ // .indexOf('item') : item이 없으면 -1을 반환
      return ['milk', ...items]; 
    } 
  }
  ```

- **Advanced 2**

  배포한 모듈에서 기존 함수지원을 중단하고 동일 기능을 수행하는 새로운 함수를 지원할 때

  ```js
  const MathLibrary = {
    calculateProduct(a, b){
      return a * b;
    }
  }
  ```

  ```js
  const MathLibrary = {
    multuply(a, b){
      return a * b;
    },
    calculateProduct(...args){ // ...args 자리에 배열이 와도 spread가 되어서 들어가게 됨
      console.log('Please use method "multiply" instead :)')
      return this.multuply(...args);
    }
  }
  ```

---

### 3.7 Destructuring

- 비구조화라는 개념으로 기존의 구조를 파괴시키는 작업이다.

- 구조를 파괴시킴으로서 더 직관적이고 간결한 코드를 만들 수 있다.

- **Object 에서의 비구조화** 

  ```js
  const computer = {
    model : 'Macbook Air',
    year : 2018,
  }
  
  const { model, year } = computer;
  ```

  > computer 내에서의 변수 값을 위의 형식으로 불러올 수 있다.

- **함수에서의 비구조화**

  ```js
  const myFile = {
    extension: 'jpg',
    name: 'profile',
    size: 29847
  }
  
  function summary({ name, extension, size }){
    return `the file ${name}.${extension}의 크기는 ${size} 입니다.`
  }
  ```

  > Object를 매겨변수로 받되 그 안의 변수값으로 함수내에서 사용할 수 있다.

- **배열에서의 비구조화**

  ```js
  const companies = [
    'Google',
    'IBM',
    'Amazon',
    'Apple'
  ]
  
  const [ name ] = companies; // Google
  const [ name1, name2, name3 ] = companies;// Google, IBM, Amazon
  const [ one, ...rest ] = companies; // Google , [IBM, Amazon, Apple]
  ```

  > 배열의 index 순서대로 접근할 수 있다.



- **배열과 Object에서의 비구조화**

  ```js
  const wannaGo = [
    { name: 'Google', location: 'Mountain View' },
    { name: 'Facebook', location: 'Manlo Park' },
    { name: 'Apple', location: 'Cupertino' },
  ];
  
  let [ company ] = wannaGo;
  let [{ location }] = wannaGo; // wannaGo[0].location
  ```

  > 배열의 index값 내부의 변수 이름으로 접근



#### 3.7.1 실제 개발에서는?

- xy값 파싱

  ```js
  const points = [
    [7, 12],
    [-20, 3],
    [8, 0],
  ];
  
  // { x: 7, y: 12 } 형식으로 만들고 싶음
  points.map( ([ x, y ]) => {
    return { x, y };
  })
  ```

- 회원가입

  ```js
  const user = {
    username: 'neo',
    password: '123123',
    email: 'neo@hphk.kr',
  }
  
  function signup ({ username, password, email }) {
    // signup logic
  }
  
  signup(user);
  ```

- 수업 정리

  ```js
  const classes = [
    ['실전 DApp', '9am', 'Mr.John'],
    ['React', '1pm', 'neo'],
    ['Capstone', '3pm', 'Multicampus'],
  ];
  
  const classAsObject = classes.map( ([ subject, time, teacher ]) => {
    return { subject, time, teacher };
  });
  ```

---

### 3.8 Classes

- Class : 세상을 컴퓨터에서 표현하기 위해서 탄생

- JS에는 상속이라는 개념이 없고 class라는 개념이 없다.

- 하지만 class의 개념이 필요하기 때문에 JS에서도 class의 기능처럼 사용할 수 있다.

- ES5에서는 prototype으로 class 기능을 대체하였으며 절대 볼 일 없는 코드로 바로 ES6의 예시를 보자.

  ```js
  class Car {
    // 생성자 함수 
    constructor({ title }) {
      this.title = title;
    }
  
    drive() {
      return 'Vrooooooooooooom';
    }
  }
  
  class Audi extends Car {
    constructor(options){
      super(options);
      this.color = options.color;
    }
  
    honk() {
      return 'Bammmmmmmm';
    }
  }
  
  const car = new Car({ title: 'A6'});
  console.log(car);
  console.log(typeof car);
  ```
































































