/* ES5 */
var computer = {
  model: 'LG gram',
  year: 2017
}

var model = computer.model;
var year = computer.year;

/* 
  ES6 Object
  반드시 key 값이랑 변수 이름이 같아야만 가능함
*/
const computer = {
  model : 'Macbook Air',
  year : 2018,
}

const { model, year } = computer;

/* ES5 function */
var savedFile = {
  extension: 'jpg',
  name: 'profile',
  size: 29847
}

function fileSummary(file){
  return `the file ${file.name}.${file.extension}의 크기는 ${file.size} 입니다.`
}

/* ES6 function */
const myFile = {
  extension: 'jpg',
  name: 'profile',
  size: 29847
}

function summary({ name, extension, size }){
  return `the file ${name}.${extension}의 크기는 ${size} 입니다.`
}

/* ES6 Array */
const companies = [
  'Google',
  'IBM',
  'Amazon',
  'Apple'
]

// Google이 들어감 (첫번째 인자가 담김)
const [ name ] = companies;

// Google, IBM, Amazon 3가지가 들어가며 index 순서로 들어가게 됨
const [ name1, name2, name3 ] = companies;


const [ one, ...rest ] = companies;

/* Array & Object */

const wannaGo = [
  { name: 'Google', location: 'Mountain View' },
  { name: 'Facebook', location: 'Manlo Park' },
  { name: 'Apple', location: 'Cupertino' },
];

let [ company ] = wannaGo;
let [{ location }] = wannaGo; // wannaGo[0].location

/* 실제 개발에서는 ? */
const points = [
  [7, 12],
  [-20, 3],
  [8, 0],
];

// { x: 7, y: 12 } 형식으로 만들고 싶음
points.map( ([ x, y ]) => {
  return { x, y };
})

/////////////////////////////////////

const user = {
  username: 'neo',
  password: '123123',
  email: 'neo@hphk.kr',
}

function signup ({ username, password, email }) {
  // signup logic
}

signup(user);

/* 실습 */

const profile = {
  title: 'Engineer',
  department: 'Blockchain',
};

function isEngineer({ title, department }) {
  return title === 'Engineer' && department === 'Blockchain'
}

/* 실습 2 */

const classes = [
  ['실전 DApp', '9am', 'Mr.John'],
  ['React', '1pm', 'neo'],
  ['Capstone', '3pm', 'Multicampus'],
];

const classAsObject = classes.map( ([ subject, time, teacher ]) => {
  return { subject, time, teacher };
});