/* 
  Rest 나머지 
  parameter가 몇개가 들어와도 상관없는 함수 만들기
*/
  // parameter가 2개만 있어야 함
const addNumbers = (a,b) => {
  const numbers = [a,b];
  return numbers.reduce( (acc, number) => (acc + number), 0);
}

  // parameter가 몇개가 와도 상관없음
const addAll = (...numbers) => {
  return numbers.reduce( (acc, number) => (acc + number), 0);
}



/*
  Spread 펼치다
  쉽게 배열을 합치는 방법
*/
  // 사용할 배열 선언
let defaultColors = ['red', 'green', 'blue'];
let myColors = ['black', 'navy', 'gold'];
let iPhoneColors = ['rose gold', 'space gray']

  // 기존의 배열을 합치는 방법
let palette = defaultColors.concat(myColors);

  // Spead 사용법
palette = ['brown', ...defaultColors, ...myColors, ...iPhoneColors];



/* 
  실습 1
  milk가 반드시 shopping list에 있어야 하는 경우  
*/
const showShoppingList = (...items) => {
  if(items.indexOf('milk' < 0)){ // .indexOf('item') : item이 없으면 -1을 반환
    return ['milk', ...items]; 
  } 
}



/*
  실습 2
  기존의 함수와 같은 새로운 기능을 추가할 때
*/

  // 기존 Library
let MathLibrary = {
  calculateProduct(a, b){
    return a * b;
  }
}

  // 새로운 Library
let MathLibrary = {
  multuply(a, b){
    return a * b;
  },
  calculateProduct(...args){ // ...args 자리에 배열이 와도 spread가 되어서 들어가게 됨
    console.log('Please use method "multiply" instead :)')
    return this.multuply(...args);
  }
}



/*
  실습 3
  학습한 내용들 짧은 복습
*/

const join = (array1, array2) => {
  // return array1.concat(array2);
  return [...array1, ...array2];
}

const unshift = (array, a, b, c, d, e) => {
  //return [a,b,c,d,e].concat(array);
  return [a, b, c, d, e, ...array];
}