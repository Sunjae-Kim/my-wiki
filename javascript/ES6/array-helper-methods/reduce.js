/* ES5 for() */
var numbers = [10, 20, 30];
var sum = 0;

for (var i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

/* ES6 reduce */
var result = numbers.reduce(function(acc, number) {
  // accumulator 축적할 도구 function뒤의 parameter로 초기화가 됨
  return acc + number;
}, 0);

/* map vs reduce */
var myColors = [{ color: "black" }, { color: "red" }, { color: "gold" }];

var onlyColors = myColors.map(color => color.color);

var onlyColors2 = myColors.reduce(function(acc, color) {
  acc.push(color.color);
  return acc;
}, []);

/* 
  In real life
  올바르게 닫힌 괄호 확인
*/

  // 내가만든 코드
function isGoodParens(string) {
  if (string === "" || string === undefined || string === null) return false;
  var array = string.split("");

  var result = array.reduce((acc, element) => {
    if (acc[0] !== ")") {
      // 배열에 값이 있을 때 끝 괄호가 들어오면 pop
      if (element === ")" && acc.length > 0) {
        acc.pop();
        return acc;
      } else {
        // 배열에 element를 push
        acc.push(element);
        return acc;
      }
    } else {
      // 끝괄호가 배열의 시작이면 아무 작업도 안함
      return acc;
    }
  }, []);

  // 다 pop되어 없어졌다면 true
  result = result.length === 0 || false;
  return result;
}
  // 강사님 코드
function isGoodParens(string) {
  return !string.split('').reduce(function(acc, char){
    if(acc < 0) {
      return  acc;
    } else if (char ==='(') {
      ++acc;
    } else {
      --acc;
    }
    return acc
  }, 0);
}

/* 실습 1 */
var trips = [{ distance: 34 }, { distance: 10 }, { distance: 100 }];

var totalDistance = trips.reduce((acc, trip) => {
  return acc + trip.distance;
}, 0);

/* 실습 2 */
var desks = [
  { type: "sitting" },
  { type: "standing" },
  { type: "sitting" },
  { type: "sitting" },
  { type: "standing" }
];

var deskTypes = desks.reduce(
  function(acc, desk) {
    acc[desk.type] += 1;
  },
  { sitting: 0, standing: 0 }
);
console.log(deskTypes); // { sitting : 3, standing : 2 }

/* 실습 3 (advanced) */
  // 내가 만든 코드
function unique(array) {
  return Object.keys(
    array.reduce(function(acc, element) {
      if (acc[element] === undefined) acc[element] = 0;
      acc[element] += 1;
      return acc;
    }, {})
  ).map(function(element) {
    return Number(element);
  });
}
  // 강사님 코드
function unique(array) {
  array.reduce(function(uniqArray, element){
    if(!uniqArray.find(function(uniqElement){
        return element === uniqElement;
      })) {
        uniqArray.push(element);
      }
      return uniqArray;
  }, []);
}
  

var numbers = [4, 1, 3, 2, 2, 1, 3, 3, 4, 4, 4];
unique(numbers); // [1,2,3,4]
