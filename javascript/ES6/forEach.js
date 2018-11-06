/* ES5 for() */
var colors = ['red', 'blue', 'green'];

for(var i = 0; i < colors.length; i++){
  console.log(colors[i]);
}

/* ES6 forEach() */
colors.forEach(function(color){
  console.log(color);
}) 

var numbers = [1,2,3,4,5];
var sum = 0;

// 함수 별도 정의
function add(number){
  sum += number;
}

// add라는 logic을 호출한것이기 때문에 ()를 쓰지 않는다.
numbers.forEach(add) 
console.log(sum);

/* In Real World */
spamMails = [];
function deleteMail(spamMail){
  console.log(`${spamMail}을 삭제`);
};

spamMails.forEach(function(spamMail){
  deleteMail(spamMail);
})

/* 실습1 */
function handlePosts(){
  var posts = [
    {id:1,title:'a'},
    {id:2,title:'b'},
    {id:3,title:'c'},
  ];

  posts.forEach(function(post){
    savePost(post);
  })
}

/* 실습2 */
var images = [
  {height: 10, width: 30 },
  {height: 20, width: 90 },
  {height: 54, width: 32 },
]

var areas = []

images.forEach(function(image){
  areas.push(image.height * image.width);
})
console.log(areas);