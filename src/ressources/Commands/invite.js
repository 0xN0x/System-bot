exports.run = (client, message, args) => {
  message.channel.send(`Click the following link to add me to your server: ${client.settings.invite}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 1
};

exports.help = {
  name: `invite`,
  description: `Invite me in your server.`,
  usage: `${client.settings.prefix}invite`
};
