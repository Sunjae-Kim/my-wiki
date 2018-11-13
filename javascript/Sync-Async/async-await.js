console.log("메인코드 진행중 ...");

async function run() {
  try{
    const user = await getUser(1);
    const repos = await getRepos(user.gitHubID);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  }catch(error){
    console.error(error);
  }
}

run();

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

function getRepos(userID) {
  console.log(`Finding [ ${userID} ]'s all github repo`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const repos = ["TIL", "ES6", "Express"];
      const number = Math.floor(Math.random() * 100);
      // async 한 작업 중...
      if (number % 2 === 1) resolve(repos);
      else reject(new Error(`Cannot find Repos with userID(${userID})`));
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
