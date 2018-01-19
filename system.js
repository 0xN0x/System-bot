console.log('\033c');

var colog = require('colog');
require('fs').readFile(`${process.cwd()}/Core/connect.schema`, 'utf8', (err, data) => {console.log(data)})
const Discord = require("discord.js");
const sharder = new Discord.ShardingManager(`${__dirname}/system-client.js`, {totalShards:3,respawn:true});

sharder.spawn(3);
