console.log("메인코드 진행중 ...");

getUser(1)
  .then(user => getRepos(user))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits))
  .catch(error => console.log(error.message));

function getUser(id) {
  console.log("Reading Data from Database");
  const users = [{ id: 1, gitHubID: "neo" }, { id: 2, gitHubID: "john" }];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);
      // Ready!!
      if (user) resolve(user);
      else reject(new Error(`Cannot find the user with id(${id})`));
    }, 2000);
  });
}

function getRepos(user) {
  console.log(`Finding [ ${user.gitHubID} ]'s all github repo`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const repos = ["TIL", "ES6", "Express"];
      const number = Math.floor(Math.random() * 100);
      // async 한 작업 중...
      if (number % 2 === 1) resolve(repos);
      else reject(new Error(`Cannot find Repos with userID(${user.id})`));
    }, 1500);
  })
}

function getCommits(repo) {
  console.log(`Getting all Commits in [ ${repo} ]`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Init", "Finish"])
    }, 1000);
  })
}
