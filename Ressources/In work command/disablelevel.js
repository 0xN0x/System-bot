exports.run = (client, message, args) => {
  client.mysql.query(`SELECT * FROM guilds WHERE g_id = ${message.guild.id}`, function(err, rows, fields) {
    if (rows[0].levelup == 0) return message.channel.send('The level system are already disabled.')
    else {
      client.mysql.query(`UPDATE guilds SET levelup = 0 WHERE g_id = ${message.guild.id}`);
      return message.channel.send('The level system are now disabled.')
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 7,
  type: 2
};

exports.help = {
  name: `disablelevel`,
  description: `Disable the level system.`,
  usage: `${client.settings.prefix}disablelevel`
};
