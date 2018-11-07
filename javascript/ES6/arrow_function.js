/* ES5 */
const add = function(a,b){
  return a+b;
}

/* 
  ES6 
  1. return 문 밖에 없을 때 return 문 생략 가능
  2. parameter가 1개일 때 괄호 생략 가능
*/
const multiply = (a,b) => a*b;

/* 예시 */
const numbers = [1,2,3];
const doubleNumbers = numbers.map( number => number * 2);

/* 
  'fat arrow' 와 'function'의 차이 
  Learning Javascript p.176 참고
*/
const team = {
  members : ['Iron Man', 'Thor', 'Hulk', 'Captain America', 'Dr.Strange'],
  teamName : 'Avengers',
  teamSummary : function() {
    return this.members.map(member => `${member} is the ${this.teamName}`)
  },
  makeFunctionLikeThis(){
    console.log('hi');
  },
}

team.teamSummary();