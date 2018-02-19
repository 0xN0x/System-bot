var flip = require('flip-text')

exports.run = (client, message, args) => {
  if (args) return message.channel.send(flip(args));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `reverse`,
  description: `Reverse a text.`,
  usage: `${client.settings.prefix}reverse <text>`
};
