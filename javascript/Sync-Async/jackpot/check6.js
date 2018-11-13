// const myNumbers = require('./pick6');
const getRealData = require('./get6');
const _ = require("underscore");


getRealData(800)
  .then(lottoData => {
    const start = new Date().getTime();
    let ranking = { '꽝': 0, '5등':0, '4등':0, '3등':0, '2등':0, '1등':0 }

    for(let i = 0; i < 100000000; i++){
      const numbers = _.range(1, 46);
      const myNumbers = _.sample(numbers, 6); 
      ranking = findRank(lottoData, myNumbers, ranking);
    }

    const end = new Date().getTime();
    const spent = end - start;

    console.log(ranking);
    console.log(`Time spent : ${spent}`);
  })



function findRank(lottoArray, myNumbers, ranking){
  const { luckyNumbers, bonusNo } = lottoArray;
  let result = 0;
  let bonus = 0;
  luckyNumbers.forEach((luckyNumber) => {
    myNumbers.forEach(myNumber => {
      if (luckyNumber === myNumber) result++;
      if (myNumber === bonusNo && bonus !== 1) bonus++;
    })
  })

  if( result === 6) ranking["1등"]++;
  if( (result + bonus ) === 6 ) ranking["2등"]++;
  else if( result === 5 ) ranking["3등"]++;
  if( result === 4 ) ranking["4등"]++;
  if( result === 3 ) ranking["5등"]++;
  else ranking["꽝"]++;

  return ranking;
}