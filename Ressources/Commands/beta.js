exports.run = (client, message, args) => {

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['b'],
  permLevel: 31,
  type: 7
};

exports.help = {
  name: `beta`,
  description: `Beta commands.`,
  usage: `${client.settings.prefix}beta <text>`
};
