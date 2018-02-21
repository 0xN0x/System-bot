exports.run = (client, message) => {
	if(!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return system.shortsend(message.channel, `I need the \`Ban members\` permission for do that action.`);

	let text = ``;
	function multiban(user) {
		message.guild.member(user).ban();
		if(!text) text += `**${user.username}**`;
		else text += `, **${user.username}**`;
	}
	if(!message.mentions.users.first()) return system.shortsend(message.channel, `You need mention peoples`);
	message.mentions.users.map(user => multiban(user));
	message.channel.send(`${text} has been banned.`);
	return true;
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 6,
	type: 2
};

exports.help = {
	name: `multiban`,
	description: `Ban mentionned peoples.`,
	usage: `${client.settings.prefix}multiban <user> [user, user, ...]`
};
