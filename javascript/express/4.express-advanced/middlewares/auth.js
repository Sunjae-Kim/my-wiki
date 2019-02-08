function auth(req, res, next){
  console.log('사용자 인증을 진행중입니다.');
  next();
};
module.exports = auth;