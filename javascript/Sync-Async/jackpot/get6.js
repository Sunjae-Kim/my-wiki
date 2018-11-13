const http = require("http");

function getLottoData(drwNo) {
  const url = `http://www.nlotto.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;

  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let buff = "";

      res.on("data", chunk => {
        buff += chunk;
      });

      res.on("end", () => {
        if (buff) resolve(findLuckyNumbers(JSON.parse(buff)));
        else reject(new Error("error occured"));
      });
    });
  });
}

function findLuckyNumbers(lottoData = {}) {
  let luckyNumbers = [];
  let bonusNo = "";
  for (const [key, value] of Object.entries(lottoData)) {
    if (key.includes("drwtNo")) luckyNumbers.push(value);
    if (key === "bnusNo") bonusNo = value;
  }
  return { luckyNumbers, bonusNo };
}

module.exports = getLottoData;