const promise = new Promise((resolve, reject) => {
  const number = Math.floor(Math.random() * 100);
  // async 한 작업 중...
  if (number % 2 === 1) resolve({ id: 1, email: "kimsj9484@gmail.com" });
  //성공
  else reject(new Error('Error...')); // 실패
});

promise
  .then(user => console.log(user))
  .catch(error => console.error(error));