/* ES5 for() */
var computers = [
  { name: 'macbook_air', ram: 16 },
  { name: 'gram', ram: 8 },
  { name: 'series9', ram: 32 },
];

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

/* 
  ES6 
  every: 모든 요소가 조건을 통과해야 함 &&
  some: 한개의 조건이라도 통과하면 됨 ||
*/

  // computer[0] > 16 && computer[1] > 16 && computer[2] > 16
var everyLaptopAvailable = computers.every(function(computer){
  return computer.ram > 16;
})

  // computer[0] > 16 || computer[1] > 16 || computer[2] > 16
var someLaptopAvailable = computers.some(function(computer){
  return computer.ram > 16;
})

/* 
  실습 1
  이름의 글자수가 4개 이상을 검색
*/
var names = [
  'alex',
  'bill',
  'chris'
];

names.every(function(name){
  return name.length > 4;
}) // false

names.some(function(name){
  return name.length > 4;
}) // true

/* 
  실습 2
  user들의 submit 상태를 확인
*/
var users = [
  { id: 21, submit: true },
  { id: 33, submit: false },
  { id: 712, submit: true },
];

var allSubmitted = users.every(user => user.submit)

/* 
  실습 3
  요청의 상태가 진행중인지 확인
*/
var requests = [
  { url: '/photos', status: 'complete' },
  { url: '/albums', status: 'pending' },
  { url: '/users', status: 'failed' },
];

var inProgress = requests.some(request => request.status === 'status');