exports.run = (client, message, args) => {
  if (!message.guild.members.get(client.user.id).hasPermission('BAN_MEMBERS')) return system.shortsend(message.channel, `I need the \`Ban members\` permission for do that action.`);
	let text = ``;
	function multiban(u) {
		message.guild.member(u).ban();
		if (!text) { text += `**${u.username}**`}
		else { text += `, **${u.username}**`}
	}
	if (!message.mentions.users.first()) return system.shortsend(message.channel, `You need mention peoples`);
	message.mentions.users.map(u => multiban(u));
	message.channel.send(`${text} has been banned.`)
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
