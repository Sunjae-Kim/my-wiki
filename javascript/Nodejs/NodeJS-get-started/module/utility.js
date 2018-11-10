console.log('1번만 출력됨');

module.exports = function(numbersToSum = []){
  let sum = 0;
  numbersToSum.forEach(number => sum += number);
  return sum;
};

console.log('utility end')