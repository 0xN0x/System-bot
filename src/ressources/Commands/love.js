var querystring = require("querystring");
var curl = require("curlrequest");

exports.run = (client, message) => {
	if(!message.mentions.users.first()) return message.channel.send(`You need mention someone`);

	var sname = message.mentions.users.array()[1] ? querystring.escape(message.mentions.users.array()[1].username) : querystring.escape(message.author.username);

	var options = {
		url: `https://love-calculator.p.mashape.com/getPercentage?fname=${querystring.escape(message.mentions.users.array()[0].username)}&sname=${sname}`,
		headers: {
			"X-Mashape-Key": client.settings.mashape,
			Accept: "application/json"
		}
	};
	curl.request(options, (err, parts) => {
		if(err) return system.log(err, "error");

		message.channel.send({
			embed: {
				author: { name: `Love test - ${message.mentions.users.array()[0].username} X ${message.mentions.users.array()[1] ? message.mentions.users.array()[1].username : message.author.username}` },
				description: `${JSON.parse(parts).result}\n**${JSON.parse(parts).percentage}** ❤️`,
				color: 0xFFFFFF
			}
		});
		return true;
	});
	return true;
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 4
};

exports.help = {
	name: `love`,
	description: `Love meter.`,
	usage: `${client.settings.prefix}love <user> [user]`
};
