var xkcd = require('xkcd-api');

exports.run = (client, message, args) => {
  xkcd.random(function(err, resp) {
    message.channel.send({
      embed: {
        author: {
          name: resp.alt
        },
        image: {
          url: resp.img
        },
        footer: {
          text: `${resp.day}/${resp.month}/${resp.year}`
        }
      }
    })
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
  name: `xkcd`,
  description: `Random xkcd meme.`,
  usage: `${client.settings.prefix}xkcd <text>`
};
