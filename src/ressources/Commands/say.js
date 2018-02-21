exports.run = (client, message, args) => {
	message.channel.send({
		embed: {
			author: {
				name: `${message.author.username}`,
				icon_url: message.author.avatarURL
			},
			description: `${args}`,
			color: 0x337AB7
		}
	}).then(message.delete());
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 1
};

exports.help = {
	name: `say`,
	description: `Make the bot say something.`,
	usage: `${client.settings.prefix}say <text>`
};
