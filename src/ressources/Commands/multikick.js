exports.run = (client, message) => {
	if(!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) return system.shortsend(message.channel, `I need the \`Kick members\` permission for do that action.`);

	let text = ``;
	function multiban(user) {
		message.guild.member(user).kick();
		if(!text) text += `**${user.username}**`;
		else text += `, **${user.username}**`;
	}
	if(!message.mentions.users.first()) return system.shortsend(message.channel, `You need mention peoples.`);
	message.mentions.users.map(user => multiban(user));
	message.channel.send(`${text} has been kicked.`);
	return true;
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 5,
	type: 2
};

exports.help = {
	name: `multikick`,
	description: `Kick mentionned peoples.`,
	usage: `${client.settings.prefix}kick <user> [user, user, ...]`
};
