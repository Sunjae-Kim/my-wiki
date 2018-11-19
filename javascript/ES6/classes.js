/* 
  ES5 : Something lisk class...?
  Javascript에는 상속이라는 개념이 없고 class라는 개념이 없다.
   - class : 세상을 컴퓨터에서 표현하기 위해서 탄생
*/

/* Prototype으로 Class의 기능을 대체함 */
// function Car (options) {
//   this.title = options.title;
// }
// Car.prototype.drive = function() {
//   return 'Vroom...';
// }
// var car = new Car({ title: 'Genesis' });

// function Ferrari(options){
//   Car.call(this, option);
//   this.color = options.color;
// }

// Ferrari.prototype = Object.create(Car.prototype);
// Ferrari.prototype.constructoe = Ferrari;

// Ferrari.prototype.honk = function(){
//   return 'Bammmmmm';
// }

// var myFerrari = new Ferrari({ color: 'red', title: 'laFerrari'})

/* ES6 class */
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

/* 실습 1 */
// Monster 는 생성될 때 health 가 100 이다.
// constructor() 는 options 라는 object 를 받으며, name key 를 가진다.
// Monter 의 instance 에게 name 을 선언하자.
class Monster {
  constructor(options){
    this.name = options.name;
    this.health = 100;
  }
}

const monster = new Monster({ name: 'monster '});
console.log(monster);

/* 실습 2 */
// Monster 클래스의 subclass Snake 클래스를 생성하자.
// 생성자함수는 Monster 와 똑같다. options 를 받는다.
// Snake 클래스는 bite() method 를 갖는다. 인자는 다른 Monster 의 객체
// bite() 를 통과한 다른 Snake 인스턴스는 체력 (health) 가 10 깎인다.
class Snake extends Monster {
  constructor(options){
    super(options);
  }

  bite(monster){
    monster.health -= 10;
  }
}

const snake = new Snake({ name: 'snake' });
snake.bite(monster);
console.log(monster);