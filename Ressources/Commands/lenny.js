exports.run = (client, message, args) => {
  message.channel.send(`( ͡° ͜ʖ ͡°)`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 4
};

exports.help = {
  name: `lenny`,
  description: `( ͡° ͜ʖ ͡°)`,
  usage: `${client.settings.prefix}lenny`
};
