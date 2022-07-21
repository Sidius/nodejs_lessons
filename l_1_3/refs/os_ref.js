const os = require('os');

// Platform
console.log(os.platform());

// Architecture
console.log(os.arch());

// Information
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// All memory
console.log(os.totalmem());

// Core directory
console.log(os.homedir());

// System work time (milliseconds)
console.log(os.uptime());