var fs = require('fs');

exports.run = (client, message, args) => {
  var img = system.findImage('cubs');
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
  name: `cubs`,
  description: `Random cubs pictures.`,
  usage: `${client.settings.prefix}cubs`
};
