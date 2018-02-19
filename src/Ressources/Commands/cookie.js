exports.run = (client, message, args) => {
  function sendCookie(channel, sender, receiver) {
    if (receiver.bot == true) return message.channel.send(`:cookie: • **${sender.username}** gave a cookie to **<@${receiver.id}>**.. Oh... You're alone ? I'm sorry for you Q_Q`)
    else if (receiver.id == sender.id) return message.channel.send(`:cookie: • Do you like your own cookies **<@${sender.id}>** ?`)
    else return message.channel.send(`:cookie: • **${sender.username}** gave a cookie to **<@${receiver.id}>**`)
  }

  if (message.mentions.users.first()) return sendCookie(message.channel, message.author, message.mentions.users.first())
  else if (args && system.getUser(message, args)) return sendCookie(message.channel, message.author, system.getUser(message, args).user)
  else return message.channel.send(`Try with : \`$$cookie <user>\``)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 4
};

exports.help = {
  name: `cookie`,
  description: `Give a cookie to someone!`,
  usage: `${client.settings.prefix}cookie <user>`
};
