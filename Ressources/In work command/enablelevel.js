exports.run = (client, message, args) => {
  /*bot.connection.query(`SELECT * FROM guilds WHERE g_id = ${m.guild.id}`, function(err, rows, fields) {
    if (rows[0].levelup == 1) return system.send(m.channel, 'The level system are already enabled.')
    else {
      bot.connection.query(`UPDATE guilds SET levelup = 1 WHERE g_id = ${m.guild.id}`);
      return system.send(m.channel, 'The level system are now enabled.')
    }
  });*/
  message.channel.send(":no_entry: Level module is temporary disabled.")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 7,
  type: 2
};

exports.help = {
  name: `enablelevel`,
  description: `Enable the level system.`,
  usage: `${client.settings.prefix}enablelevel`
};
