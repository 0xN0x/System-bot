exports.run = (client, message) => {
	let author = message.author;

	message.channel.send({
		embed: {
			author: {
				name: author.username,
				icon_url: author.avatarURL
			},
			fields: [{
				name: "Time of response",
				value: `${client.pings[0]} ms`,
				inline: true
			}],
			color: 0xFFFFFF
		}
	});
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
