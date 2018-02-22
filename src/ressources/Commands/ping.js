const { RichEmbed } = require("discord.js");

exports.run = (client, message) => {
	let author = message.author;

	const embed = new RichEmbed()
		.setAuthor(author.username, author.avatarURL)
		.addField("Time of response", `${client.pings[0]} ms`)
		.setColor('#ffffff');

	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 1
};

exports.help = {
	name: "ping",
	description: "Pong.",
	usage: `${client.settings.prefix}ping`
};
