exports.run = (client, message, args) => {
  message.channel.send(`${client.settings.support}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 1
};

exports.help = {
  name: `support`,
  description: `Join my home.`,
  usage: `${client.settings.prefix}support`
};
