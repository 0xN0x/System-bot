exports.run = (client, message, args) => {
  if (message.mentions.users.first()) {
    message.channel.send(`**${message.mentions.users.first().username}** got tickled by **${message.author.username}**`, {
      file: {
        attachment: '/home/shiigehiro/System/Ressources/images/tickle.gif',
        name: 'tickle.gif'
      }
    })
  } else {
    message.channel.send(`Try with the following format : \`$$tickle <@user>\``)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 4
};

exports.help = {
  name: `tickle`,
  description: `Tickle someone.`,
  usage: `${client.settings.prefix}tickle <user>`
};
