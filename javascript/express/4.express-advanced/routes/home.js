const express = require('express');
const router = express.Router();

/* 
  Middlewares
  Router handler Function
*/
router.get("/", (req, res) => {
  res.render('index', {
    title: 'Happy Hacking',
    greeting: 'May you have Happy Hacking'
  });
});

router.get("/:name", (req, res) => {
  res.send(`Hi ${req.params.name}`);
});


module.exports = router;