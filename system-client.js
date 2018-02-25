const fs = require("fs");
const mysql = require("mysql");
const Discord = require("discord.js");
var mail = require("nodemailer").mail;

global.client = new Discord.Client();
client.settings = require(`${__dirname}/src/core/settings.json`);
global.system = require(`${__dirname}/src/core/utils.js`);
require(`${__dirname}/src/core/EventLoader`)(client);

client.mysql = mysql.createConnection({
	host: client.settings.mysql.host,
	user: client.settings.mysql.user,
	password: client.settings.mysql.password,
	database: client.settings.mysql.database
});

client.dd = new system.DataDog(client.settings.datadog.user, client.settings.datadog.pass);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir(`${__dirname}/src/ressources/Commands/`, (err, files) => {
	if(err) console.error(err);
	files.forEach(file => {
		let props = require(`${__dirname}/src/ressources/Commands/${file}`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

client.reload = command => new Promise((resolve, reject) => {
	try {
		delete require.cache[require.resolve(`${__dirname}/src/ressources/Commands/${command}`)];
		let cmd = require(`${__dirname}/src/ressources/Commands/${command}`);
		client.commands.delete(command);
		client.aliases.forEach((cmd, alias) => {
			if(cmd === command) client.aliases.delete(alias);
		});
		client.commands.set(command, cmd);
		cmd.conf.aliases.forEach(alias => {
			client.aliases.set(alias, cmd.help.name);
		});
		resolve();
	} catch(err) {
		reject(err);
	}
});

process.on("unhandledRejection", err => {
	if(err.stack.indexOf("Still spawning shards.") > -1) return;
	system.log(err.stack, "error");
});

client.login(client.settings.token);
