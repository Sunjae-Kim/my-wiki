/* ES5 for() */
var users = [
  { name: 'Tony Stark' },
  { name: 'Steve Rogers' },
  { name: 'Thor' },
];

var user;

for(var i = 0; i < users.length; i++){
  if(users[i].name === 'Tony Stark'){
    user = users[i];
    break; // 찾는 순간 for문에서 벗어남
  }
};
console.log(user);

/* ES6 */
var user = users.find(user => user.name === 'Tony Stark');

/* More complex */
function Car(model){
  this.model = model;
}

var cars = [

  new Car('Mercedes'),
  new Car('Ferrari'),
  new Car('BMW'),
  new Car('HK'),
];

var car = cars.find(car => car.model === 'HK');
console.log(car);

/* In real life */
// http://myblog.com/articles/1

const articles = [
  { id: 1, title: 'Motto', content: 'HappyHacking' },
  { id: 2, title: 'My presonal Info', content: 'It\'s secret guys lol' },
  { id: 3, title: 'Ruby vs Python', content: 'Do what you want!' },
  { id: 4, title: 'Welcome to the', content: 'Black parade' },
  //...
];
  
const articleId = getIdFromURL();

const article = articles.find(function(article) {
  return article.id === articleID;
});

/* 
  실습 1 
  유저 리스트에서 admin 찾기
*/
var users = [
  { id: 1, admin: false},
  { id: 2, admin: false},
  { id: 3, admin: true},
];

var admin;

admin = users.find(function(user){
  return user.admin;
})

/* 
  실습 2 
  잔액이  12인 계좌를 account에 저장하자!
*/

var accounts = [
  { balance: -10 },
  { balance: 0 },
  { balance: 12 },
];

var account;

account = accounts.find(account => account.balance === 12);

/* 
  실습 3 (advanced)
  정해진 조건에 맞는 요소 검색
*/
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