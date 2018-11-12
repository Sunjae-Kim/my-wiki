console.log('메인코드 진행중 ...');
getUser(1, gRepos);
console.log('메인코드 계속 진행중 ...');

function gRepos(user){
  getRepos(user, gCommits);
}

function gCommits(repos){
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits){
  console.log(commits);
}

function getUser(id, callback){
  const users = [
    { id: 1, gitHubID: 'neo'},
    { id: 2, gitHubID: 'john'}
  ]
  setTimeout(()=>{
    console.log('Reading Data from Database');
    const user = users.find(user => user.id === id);
    callback(user);
  }, 2000);
}

function getRepos(user, callback) {
  console.log(`Finding [ ${user.gitHubID} ]'s all github repo`);
  setTimeout(()=>{
    callback(['TIL', 'ES6', 'Express']);
  }, 1500);
}

function getCommits(repo, callback){
  console.log(`Getting all Commits in [ ${repo} ]`);
  setTimeout(() => {
    callback(['Init', 'Finish']);
  }, 1000);
}