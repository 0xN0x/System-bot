var fs = require('fs');

exports.run = (client, message, args) => {
  var img = system.findImage('wolf');
  message.channel.send({
    file: {
      attachment: img[0],
      name: `photo.${img[1]}`
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 4
};

exports.help = {
  name: `wolf`,
  description: `Random wolves pictures.`,
  usage: `${client.settings.prefix}wolf`
};
