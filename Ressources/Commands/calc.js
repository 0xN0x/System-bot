var math = require('mathjs')

exports.run = (client, message, args) => {
  try {
    system.send(message.channel, math.eval(args))
  } catch(e) {
    if(e) system.send(message.channel, `**${e.message}**`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `calc`,
  description: `Calculate something.`,
  usage: `${client.settings.prefix}calc <calc here>`
};
