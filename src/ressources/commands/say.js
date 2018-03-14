exports.run = async (bot, message, args) => {
	message.channel.createMessage(process.memoryUsage().rss/1000000)
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
	usage: `say <text>`
};