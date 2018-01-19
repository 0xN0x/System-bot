function enabled(m, cid) {
  m.channel.send(`NSFW commands is now **enable** in this channel **${m.guild.channels.get(cid)}**.`)
}
function disabled(m, cid) {
  m.channel.send(`NSFW commands is now **disable** in the channel **${m.guild.channels.get(cid)}**.`)
}

exports.run = (client, message, args) => {
  client.mysql.query(`SELECT * FROM guilds WHERE g_id = ${message.guild.id}`, function(err, rows, fields) {
    if (rows[0].NSFW && rows[0].NSFW.indexOf(message.channel.id) > -1) {
      var array = rows[0].NSFW.replace(message.channel.id+",", "");
			client.mysql.query(`UPDATE guilds SET NSFW = '${array}' WHERE g_id = "${message.guild.id}"`);
			disabled(message, message.channel.id);
    } else if (rows[0].NSFW) {
      client.mysql.query(`UPDATE guilds SET NSFW = '${rows[0].NSFW+message.channel.id+","}' WHERE g_id = ${message.guild.id}`);
      enabled(message, message.channel.id);
    } else {
      client.mysql.query(`UPDATE guilds SET NSFW = '${message.channel.id},' WHERE g_id = ${message.guild.id}`);
      enabled(message, message.channel.id);
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
  name: `nsfw`,
  description: `Enable/Disable NSFW command in this channel.`,
  usage: `${client.settings.prefix}nsfw`
};
