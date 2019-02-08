const games = require('./routes/games');
const home = require('./routes/home');
const debug = require('debug')('app:startup');
const helmet = require("helmet");
const morgan = require("morgan");
// const config = require("config");
// const logger = require("./middlewares/logger");
// const auth = require("./middlewares/auth");
const express = require("express");
const app = express();

/* 
  Middle Ware
  request.body의 값이 통과할 때 Object로 변환시키는 역할
*/
app.use(helmet());
if(app.get('env') === 'development'){
  debug('MORGAN을 실행합니다.')
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(logger);
// app.use(auth);
app.use('/api/games', games);
app.use('/home', home);

app.set('view engine', 'pug');
app.set('views', './views'); 

// Setting Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});