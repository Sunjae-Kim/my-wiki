const _ = require("underscore");
const numbers = _.range(1, 46);
const myNumbers = _.sample(numbers, 6);

module.exports = myNumbers;