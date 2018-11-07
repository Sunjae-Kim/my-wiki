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

/* ES6 every, some */

// computer[0] > 16 && computer[1] > 16 && computer[2] > 16
var everyLaptopAvailable = computers.every(function(computer){
  return computer.ram > 16;
})

// computer[0] > 16 || computer[1] > 16 || computer[2] > 16
var someLaptopAvailable = computers.some(function(computer){
  return computer.ram > 16;
})

//////////////////

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

/* 실습 1 */
var users = [
  { id: 21, submit: true },
  { id: 33, submit: false },
  { id: 712, submit: true },
];

var allSubmitted = users.every(user => user.submit)

/* 실습 2 */
var requests = [
  { url: '/photos', status: 'complete' },
  { url: '/albums', status: 'pending' },
  { url: '/users', status: 'failed' },
];

var inProgress = requests.some(request => request.status === 'status');