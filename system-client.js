const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const mysql = require("mysql");
const Discord = require('discord.js');
var DataDog = require('datadog');
global.client = new Discord.Client();
client.settings = require(`${__dirname}/src/core/settings.json`);
global.system = require(`${__dirname}/src/core/utils.js`)
require(`${__dirname}/src/core/EventLoader`)(client);

client.mysql = mysql.createConnection({
  host            : client.settings.mysql.host,
  user            : client.settings.mysql.user,
  password        : client.settings.mysql.password,
  database        : client.settings.mysql.database
});

client.dd = new DataDog(client.settings.datadog.user, client.settings.datadog.pass);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(`${__dirname}/Ressources/Commands/`, (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let props = require(`${__dirname}/Ressources/Commands/${f}`);
    //log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`${__dirname}/Ressources/Commands/${command}`)];
      let cmd = require(`${__dirname}/Ressources/Commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('ready', () => {
  rotateGames(client, 0);
  function rotateGames(client, i) {
    client.shard.fetchClientValues('guilds.size').then(results => {
      let games = [`⚔️ Need Help ? ${client.settings.prefix}help`,` Dev by ${client.settings.author}`, `I'm in ${results.reduce((prev, val) => prev + val, 0)} servers`];
      if (i >= games.length) i = 0;
      client.user.setPresence({
        status: "online",
        game: {
          name: games[i],
          type: 0
        }
      });
    });

    setTimeout(() => {
      rotateGames(client, ++i);
    }, 10000);
  }
});

process.on("unhandledRejection", err => {
  if (err.stack.indexOf('Still spawning shards.') > -1) return;
	system.log(err.stack, "error");
});

client.login(client.settings.token);
