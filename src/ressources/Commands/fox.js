exports.run = (client, message, args) => {
  var img = system.findImage('fox');
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
  name: `fox`,
  description: `Random foxes pictures.`,
  usage: `${client.settings.prefix}fox`
};
