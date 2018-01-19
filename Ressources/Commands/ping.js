const moment = require("moment");
const request = require("superagent");

exports.run = (client, message, args) => {
  let start = new Date();
  let author = message.author;
  request('http://www.google.com', function (error, response, body) {
    let end = new Date();
    let resp = end.getTime() - start.getTime();
    message.channel.send({
      embed: {
        type: 'rich',
        author: {
          name: author.username,
          icon_url: author.avatarURL
        },
        description: '',
        fields: [{
          name: 'Time of response',
          value:  resp/(5*2) + ' ms',
          inline: true
        }],
        color: 0xFFFFFF
      }
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 1
};

exports.help = {
  name: 'ping',
  description: 'Pong.',
  usage: `${client.settings.prefix}ping`
};
