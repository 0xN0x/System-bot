var now = require("performance-now");
exports.run = (client, message, args) => {
	const clean = text => {
		if(typeof text === "string") return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
		else return text;
	};

	try {
		var t0 = now();
		let evaled = eval(args);
		var t1 = now();

		if(typeof evaled !== "string") evaled = require("util").inspect(evaled);

		message.channel.send({
			embed: {
				description: `${clean(evaled)}`,
				footer: { text: `${(t1 - t0).toFixed(2)}ms` },
				color: 0xE7A727
			}
		});
	} catch(err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 31,
	type: 1
};

exports.help = {
	name: `eval`,
	description: ``,
	usage: `${client.settings.prefix}eval <function>`
};
