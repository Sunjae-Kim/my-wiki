// const fs = require('fs');
// const express = require('express');
const sum = require('./utility');
// const dbconfig = require('./configs/database.json');
// const routes = require('./routes')


const total = sum([100,200,300]);
const total2 = sum([100,200]);
console.log(total);