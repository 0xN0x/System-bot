exports.run = (client, message, args) => {
  let tagtext = '';
  client.mysql.query(`SELECT * FROM tags WHERE g_id = "${message.guild.id}"`, function(err, rows, fields) {
    for(var i=0;i<rows.length;i++) {
      tagtext += `\`${rows[i].name}\`; `;
    }
    message.channel.send(`**${message.guild.name} tags**\n${rows.length} tags repertoried in this server.\n${tagtext}\n`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `taglist`,
  description: `List guild tags.`,
  usage: `${client.settings.prefix}taglist`
};
