var system = module.exports = {};
var fs = require("fs");
var request = require("request");
var colog = require("colog");
var prettyMs = require("pretty-ms");
const Discord = require("discord.js");

system.update = {};
system.post = {};

system.DataDog = function(apiKey, applicationKey, opt_apiBaseUrl) {
	if(!opt_apiBaseUrl) opt_apiBaseUrl = "https://app.datadoghq.com";

	this.apiBaseUrl = opt_apiBaseUrl;
	this.apiKey = apiKey;
	this.applicationKey = applicationKey;
};

system.permission = function(permission) {
	var table = {
		1: ["Nothing.", false],
		2: ["NSFW channel.", "NSFW"],
		3: ["Owner only.", "OWNER"],
		4: ["Create instant invite.", "CREATE_INSTANT_INVITE"],
		5: ["Kick members.", "KICK_MEMBERS"],
		6: ["Ban members.", "BAN_MEMBERS"],
		7: ["Administrator.", "ADMINISTRATOR"],
		8: ["Manage channels.", "MANAGE_CHANNELS"],
		9: ["Manage guild.", "MANAGE_GUILD"],
		10: ["Add reaction.", "ADD_REACTIONS"],
		11: ["Read messages.", "READ_MESSAGES"],
		12: ["Send messages.", "SEND_MESSAGES"],
		13: ["Send TTS messages.", "SEND_TTS_MESSAGES"],
		14: ["Manage messages.", "MANAGE_MESSAGES"],
		15: ["Embed links.", "EMBED_LINKS"],
		16: ["Attach files.", "ATTACH_FILES"],
		17: ["Read message history.", "READ_MESSAGE_HISTORY"],
		18: ["Mention everyone.", "MENTION_EVERYONE"],
		19: ["Use external emojis.", "EXTERNAL_EMOJIS"],
		20: ["Connect.", "CONNECT"],
		21: ["Speak.", "SPEAK"],
		22: ["Mute members.", "MUTE_MEMBERS"],
		23: ["Deafen members.", "DEAFEN_MEMBERS"],
		24: ["Move members.", "MOVE_MEMBERS"],
		25: ["Use VAD.", "USE_VAD"],
		26: ["Change nickname.", "CHANGE_NICKNAME"],
		27: ["Manage nickanmes.", "MANAGE_NICKNAMES"],
		28: ["Manage roles.", "MANAGE_ROLES_OR_PERMISSIONS"],
		29: ["Manage webhooks.", "MANAGE_WEBHOOKS"],
		30: ["Manage emojis.", "MANAGE_EMOJIS"],
		31: ["system developpers only.", "DEV"],
		32: ["Donators only.", "BETA"]
	};
	return table[permission];
};

system.log = function(message, type) {
	const color = {
		debug: "magenta",
		error: "red",
		warn: "yellow",
		info: "green"
	}[type];
	colog.log(colog.color(`[${client.options.shardId}]`, "yellow") + colog.color(`[${type}]: ${message}`, color));
};

system.type = function(type) {
	var table = {
		1: "Core",
		2: "Moderative",
		3: "Social",
		4: "Fun",
		5: "Utilities",
		6: "NSFW"
	};
	return table[type];
};

system.shortsend = function(channel, message, time) {
	if(!channel) return system.warn("No channel found!");
	else if(!message) return system.warn("Try to send a blank message..");
	else return channel.send(message).then(msg => msg.delete(time ? time : 5000));
};

system.uptime = function(now, start) {
	return prettyMs(now - start, { secDecimalDigits: 0 });
};

system.update.command = function() {
	var commands = [];
	client.commands.array().forEach(cmd => {
		if(system.permission(cmd.conf.permLevel)[1] !== "DEV") {
			commands.push({
				name: `${client.settings.prefix}${cmd.help.name}`,
				args: cmd.help.usage, help: cmd.help.description,
				permission: system.permission(cmd.conf.permLevel)[0]
			});
		}
	});
	return commands;
};

system.update.database = function() {
	client.guilds.forEach(element => {
		client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${element.id}"`, (err, rows) => {
			if(err) return system.log(err, "error");
			if(!rows[0]) {
				client.mysql.query("INSERT INTO guilds SET ?", { g_id: element.id, prefix: "$$" });
			}
			return true;
		});
	});
};

system.getUser = function(message, search) {
	let members = message.guild.members.filter(member => {
		if(member.user.username.toLowerCase().includes(search.toLowerCase())) return true;
		if(member.nickname && member.nickname.toLowerCase().includes(search.toLowerCase())) return true;
		if(member.id === search) return true;
		return false;
	});

	if(members.last()) return members.last();
	return false;
};

system.findImage = function(folder) {
	if(!folder) return false;

	var pics = fs.readdirSync(`${process.cwd()}/src/ressources/images/${folder}/`);
	var rand = Math.floor(Math.random() * (pics.length - 1));
	var ext = pics[rand].split(".")[1];
	return [`${process.cwd()}/src/ressources/images/${folder}/${pics[rand]}`, ext];
};

system.updateGuild = function() {
	system.post.carbonitex();
	system.post.discordbot();
	system.post.discordlist();
	system.post.dborg();
	system.post.discordbotfr();
};

/* Datadog post */
system.DataDog.prototype.postSeries = function(series, callback) {
	request.post({
		url: `${this.apiBaseUrl}/api/v1/series`,
		qs: {
			api_key: this.apiKey,
			application_key: this.applicationKey
		},
		json: series
	}, callback);
};

/* system POST DATA FUNCTION */
system.post.carbonitex = function() {
	client.shard.fetchClientValues("guilds.size").then(results => {
		request.post({
			url: "https://www.carbonitex.net/discord/data/botdata.php",
			headers: { "content-type": "application/json" },
			json: true,
			body: {
				key: client.settings.carbonitex,
				servercount: results.reduce((prev, val) => prev + val, 0),
				botname: client.user.username,
				logoid: client.user.avatar,
				botid: client.user.id,
				ownername: client.settings.author,
				ownerid: client.settings.ownerid
			}
		}, (err) => {
			if(err) system.log(err, "error");
		});
	});
};

system.post.discordlist = function() {
	client.shard.fetchClientValues("guilds.size").then(results => {
		request.post({
			url: "https://bots.discordlist.net/api",
			headers: { "content-type": "application/json" },
			json: true,
			body: {
				token: client.settings.discordlist,
				servers: results.reduce((prev, val) => prev + val, 0)
			}
		}, (err) => {
			if(err) system.log(err, "error");
		});
	});
};

system.post.discordbotfr = function() {
	client.shard.fetchClientValues("guilds.size").then(results => {
		request.post({
			url: `https://discordbot.takohell.com/api/v1/bot/${client.user.id}`,
			headers: {
				"content-type": "application/json",
				Authorization: client.settings.discordbotfr
			},
			json: true,
			body: {
				count: results.reduce((prev, val) => prev + val, 0),
				shard: client.options.shardCount
			}
		}, (err) => {
			if(err) system.log(err, "error");
		});
	});
};

system.post.dborg = function() {
	client.shard.fetchClientValues("guilds.size").then(results => {
		request.post({
			url: `https://discordbots.org/api/bots/${client.user.id}/stats`,
			headers: {
				"content-type": "application/json",
				Authorization: client.settings.dborg
			},
			json: true,
			body: {
				server_count: results.reduce((prev, val) => prev + val, 0),
				shard_id: client.options.shardId,
				shard_count: client.options.shardCount
			}
		}, (err) => {
			if(err) system.log(err, "error");
		});
	});
};

system.post.discordbot = function() {
	client.shard.fetchClientValues("guilds.size").then(results => {
		request.post({
			url: `https://bots.discord.pw/api/bots/${client.user.id}/stats`,
			headers: {
				"content-type": "application/json",
				Authorization: client.settings.discordbot
			},
			json: true,
			body: { server_count: results.reduce((prev, val) => prev + val, 0) }
		}, (err) => {
			if(err) system.log(err, "error");
		});
	});
};

system.post.datadog = function() {
	client.shard.fetchClientValues("guilds.size").then(guilds => {
		client.shard.fetchClientValues("channels.size").then(channels => {
			client.shard.fetchClientValues("users.size").then(users => {
				client.mysql.query(`SELECT * FROM stats WHERE function = "m_received"`, (err, rows) => {
					if(err) return system.log(err, "error");
					client.mysql.query(`SELECT * FROM stats WHERE function = "c_received"`, (err2, rows2) => {
						if(err) return system.log(err, "error");
						client.dd.postSeries({
							series: [{
								metric: "wolver.servers",
								points: [
									[Date.now() / 1000, guilds.reduce((prev, val) => prev + val, 0)]
								],
								type: "counter",
								tags: ["Wolver"]
							}, {
								metric: "wolver.channels",
								points: [
									[Date.now() / 1000, channels.reduce((prev, val) => prev + val, 0)]
								],
								type: "counter",
								tags: ["Wolver"]
							}, {
								metric: "wolver.users",
								points: [
									[Date.now() / 1000, users.reduce((prev, val) => prev + val, 0)]
								],
								type: "counter",
								tags: ["Wolver"]
							}, {
								metric: "wolver.messages",
								points: [
									[Date.now() / 1000, rows[0].var]
								],
								type: "counter",
								tags: ["Wolver"]
							}, {
								metric: "wolver.commands",
								points: [
									[Date.now() / 1000, rows2[0].var]
								],
								type: "counter",
								tags: ["Wolver"]
							}, {
								metric: "wolver.shardCount",
								points: [
									[Date.now() / 1000, client.options.shardCount]
								],
								type: "counter",
								tags: ["Wolver"]
							}]
						});
						return true;
					});
					return true;
				});
			});
		});
	});
};

system.post.newguild = function(guild) {
	const hook = new Discord.WebhookClient(client.settings.guildhook.id, client.settings.guildhook.token);

	hook.sendMessage(`:white_check_mark: *${guild.name}* • owner: *${guild.owner.user.username}* • ${guild.members.filter(mb => mb.user.bot === false).size} users for ${guild.members.filter(mb => mb.user.bot === true).size - 1} bots`, {
		username: "system",
		avatarURL: client.user.avatarURL
	});
};

system.post.deleteguild = function(guild) {
	const hook = new Discord.WebhookClient(client.settings.guildhook.id, client.settings.guildhook.token);

	hook.sendMessage(`:no_entry: *${guild.name}* • Owner: *${guild.owner.user.username}* • ${guild.members.filter(mb => mb.user.bot === false).size} users for ${guild.members.filter(mb => mb.user.bot === true).size - 1} bots`, {
		username: "system",
		avatarURL: client.user.avatarURL
	});
};

system.post.messages = function() {
	client.mysql.query(`SELECT * FROM stats WHERE function = "m_received"`, (err, rows) => {
		if(err) return system.log(err, "error");
		client.mysql.query(`UPDATE stats SET var = ${rows[0].var + client.messages} WHERE function = "m_received"`);
		client.messages = 0;
		return true;
	});
};

system.post.commands = function() {
	client.mysql.query(`SELECT * FROM stats WHERE function = "c_received"`, (err, rows) => {
		if(err) return system.log(err, "error");
		client.mysql.query(`UPDATE stats SET var = ${rows[0].var + client.commands} WHERE function = "c_received"`);
		client.commands = 0;
		return true;
	});
};
