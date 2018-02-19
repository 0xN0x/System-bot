exports.run = (client, message, args) => {
  if (!message.guild.members.get(client.user.id).hasPermission('BAN_MEMBERS')) return system.shortsend(message.channel, `I need the \`Ban members\` permission for do that action.`);
	if (!message.mentions.users.first()) return system.shortsend(message.channel, `:warning: You need mention someone.`);
	message.guild.member(message.mentions.users.first()).ban({"reason": `Banned by ${message.author.username}#${message.author.discriminator}`, "days":3})
  system.send(message.channel, `Banned **${message.mentions.users.first().username}**.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 6,
  type: 2
};

exports.help = {
  name: `ban`,
  description: `Ban mentionned user.`,
  usage: `${client.settings.prefix}ban <user>`
};
