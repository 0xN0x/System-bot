exports.run = (client, message, args) => {
  console.log('1')
  let prefix = message.content.split(' ')[1];
	if (!prefix) return system.shortsend(message.channel, `Try with : \`$$prefix [the prefix you want]\``);
	if (prefix.length > 20) return system.shortsend(message.channel, `Prefix can't contain more than 20 letters.`);

	client.mysql.query(`SELECT * FROM guilds WHERE g_id = ${message.guild.id}`, function(err, rows, fields) {
    if (err) return console.log(err)
    client.mysql.query(`UPDATE guilds SET prefix = "${prefix}" WHERE g_id = ${message.guild.id}`);
    message.channel.send({
			embed: {
			author: {name: `Prefix changed`},
				description: `${rows[0].prefix} => ${prefix}`,
				color: 0xFFFFFF
			}
		});
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
  name: `prefix`,
  description: `Change the basic command prefix.`,
  usage: `${client.settings.prefix}prefix <new prefix>`
};
