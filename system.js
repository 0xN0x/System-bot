global.cluster = require("cluster");

if (cluster.isMaster) require('./src/master.js');
else require('./src/worker.js');