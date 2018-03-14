const settings = require(`${process.cwd()}/src/core/settings.json`);
const Eris = require('eris');
const fs = require("fs");

async function init() {
	const bot = new Eris.CommandClient(settings.token, {
		maxShards: 4,
		disableEvents: ['WEBHOOK_CREATE', 'WEBHOOK_UPDATE', 'WEBHOOK_DELETE', 'ROLE_CREATE', 'ROLE_UPDATE', 'ROLE_DELETE', 'INVITE_CREATE', 'INVITE_UPDATE', 'INVITE_DELETE', 'EMOJI_CREATE', 'EMOJI_UPDATE', 'EMOJI_DELETE']
	}, {
		name: 'System',
		prefix: '!$$$!'
	})

	let path = `${__dirname}/system-client.js`;
	let app = require(path);
	app = new app(bot);
	
	bot.connect();

	loadEvents();
	loadCommands();
}

async function loadEvents() {
	fs.readdir(`${__dirname}/src/ressources/events/`, (err, files) => {
		if(err) console.error(err);
		files.forEach(file => {
			const name = file.split('.')[0];
			bot.on(name, require(`${__dirname}/src/ressources/events/${file}`));
		});
	});
}

async function loadCommands() {
	fs.readdir(`${__dirname}/src/ressources/commands/`, (err, files) => {
		if(err) console.error(err);
		files.forEach(file => {
			let props = require(`${__dirname}/src/ressources/commands/${file}`);
			bot.registerCommand(props.help.name, (message, args) => {
				props.run(bot, message, args)
			}, props.conf);
		});
	});
}

process.on("unhandledRejection", err => {
	if(err.message && err.message.startsWith("Request timed out")) return;
	try {
		let resp = JSON.parse(err.response);
		// these codes mean someone bamboozled perms
		if(~[0, 10003, 10008, 40005, 50001, 50013].indexOf(resp.code)) return;
		else throw err;
	} catch(err2) {
		console.error(err.stack);
	}
});

cluster.worker.on("message", async msg => {
	if(msg.type === "eval") {
		try {
			let result = await eval(msg.input);
			process.send({ type: "output", result, id: msg.id });
		} catch(err) {
			process.send({ type: "output", error: err.stack, id: msg.id });
		}
	} else if(msg.type === "output") {
		cluster.worker.emit("outputMessage", msg);
	}
});

init();