const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const mysql = require("mysql");
const Discord = require('discord.js');
var DataDog = require('datadog');
global.client = new Discord.Client();
client.settings = require(`${__dirname}/Core/settings.json`);
global.system = require(`${__dirname}/Core/utils.js`)
require(`${__dirname}/Core/EventLoader`)(client);

client.mysql = mysql.createConnection({
  host            :'localhost',
  user            :'root',
  password        :'t697fyze',
  database        :'wolver'
});

client.dd = new DataDog('f4ec15c9afcb4af879047baf14c84797', '3102fa9b2d2fa762db6422cf56df9206bb634b2d');

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(`${__dirname}/Ressources/Commands/`, (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`${__dirname}/Ressources/Commands/${f}`);
    //log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
  console.log(client.options.shardId+" ready")
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
  console.log(client.options.shardId+" ready")
  rotateGames(client, 0);
  function rotateGames(client, i) {
    client.shard.fetchClientValues('guilds.size').then(results => {
      let games = [`⚔️ Need Help ? ${client.settings.prefix}help`,'⚔️ Dev by AkaNeko', `I'm in ${results.reduce((prev, val) => prev + val, 0)} servers`];
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

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

process.on("unhandledRejection", err => {
	console.log(chalk.bgRed(err.stack));
});

client.login(client.settings.token);
