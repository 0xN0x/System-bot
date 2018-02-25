console.log("\x1Bc");

const Discord = require("discord.js");
const sharder = new Discord.ShardingManager(`${__dirname}/system-client.js`, { totalShards: 4, respawn: true });

sharder.spawn(4);
