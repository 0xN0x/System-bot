exports.run = (client, message) => {
	if(!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) return system.shortsend(message.channel, `I need the \`Kick members\` permission for do that action.`);
	
	if(!message.mentions.users.first()) return system.shortsend(message.channel, `:warning: You need mention someone.`);
	
	message.mentions.users.map(u => {
		message.guild.member(u).kick({"reason": `Kicked by ${message.author.username}#${message.author.discriminator}`});
		mesage.channel.send(`Kicked **${u.username}**.`);
	});
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
	name: `kick`,
	description: `Kick a user.`,
	usage: `${client.settings.prefix}kick <user>`
};
