var math = require("mathjs");

exports.run = (client, message, args) => {
	try {
		console.log(args);
		message.channel.send(math.eval(args));
	} catch(err) {
		if(err) message.channel.send(`**${err.message}**`);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 5
};

exports.help = {
	name: `calc`,
	description: `Calculate something.`,
	usage: `${client.settings.prefix}calc <calc here>`
};
