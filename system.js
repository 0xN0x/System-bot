console.log("\x1Bc");

const settings = require(`${__dirname}/src/core/settings.json`);
const Discord = require("discord.js");
const sharder = new Discord.ShardingManager(`${__dirname}/system-client.js`, { totalShards: 4, respawn: true, token: settings.token });

sharder.spawn(4);
