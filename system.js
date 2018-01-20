console.log('\033c');

const Discord = require("discord.js");
const sharder = new Discord.ShardingManager(`${__dirname}/system-client.js`, {totalShards:3,respawn:true});

sharder.spawn(3);
