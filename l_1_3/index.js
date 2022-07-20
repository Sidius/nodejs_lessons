// console.log('Hello', __dirname, __filename);

// const userObj = require('./user');
// console.log(userObj);

const obj = require('./user');
console.log(obj.user);
obj.sayHello();

const {user, sayHello} = require('./user');
console.log(user);
sayHello();