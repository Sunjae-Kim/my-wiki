const name = 'sunjae-kim';
/* ES5 */
const string = 'my name is ' + name;

/* 
  ES6 
  `` 안에 String을 넣고 ${} 안으로 변수 및 함수 접근이 가능하다.
*/
const newString = `my name is ${name}`
const time = `The year is ${new Date().getFullYear()}`