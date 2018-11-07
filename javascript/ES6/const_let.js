/* ES5 */
var name = '김선재';
var title = 'Junior software developer';
var workHour = '9 am to 6 pm';

name = '김똥재'
title = 'Senior'

/* ES6 */
/* 모두 const로 쓰되 나중에 재할당이 필요한 정보만 let으로 할당 */
const name = '김선재';
let title = 'Junior software developer';
let workHour = '1 pm to 6 pm';

name = '김똥재' // 에러발생

function count(targetString){
  const characters = ['a', 'e', 'i', 'o', 'u'];
  let number = targetString.split('').reduce(function(acc, char){
    if(characters.includes(char)) acc++;
    return acc;
  }, 0)
  return number;
}

// Facebook Profile management
let name = 'Your Name';
let age = 100;
const dateOfBirth = '19941015';