exports.run = (client, message, args) => {
  var ext = "";
  client.mysql.query(`SELECT * FROM command ORDER BY count DESC`, function(err, rows, fields) {
    for (var i=0; i<10; i++) {
      ext += `${i+1}) **${rows[i].command}** = ${rows[i].count} uses\n`
    }
    message.channel.send({
  		embed: {
        author: {name: `System commands top`},
  			description: ext,
  			color: 0xFFFFFF
  		}
  	});
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 31,
  type: 1
};

exports.help = {
  name: `topcmds`,
  description: `Most used commands.`,
  usage: `${client.settings.prefix}topcmds`
};
