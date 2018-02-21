exports.run = (client, message) => {
	client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${message.guild.id}"`, (err, rows) => {
		if(err) return system.log(err, "error");

		if(rows[0].joinlog) {
			if(rows[0].joinlog === message.channel.id) {
				client.mysql.query(`UPDATE guilds SET joinlog = NULL WHERE g_id = "${message.guild.id}"`);
				message.channel.send(`Join log is now **disable** in this channel **${message.guild.channels.get(message.channel.id)}**.`);
			} else {
				client.mysql.query(`UPDATE guilds SET joinlog = "${message.channel.id}" WHERE g_id = "${message.guild.id}"`);
				message.channel.send(`Join log is now **disable** in the channel **${message.guild.channels.get(rows[0].joinlog)}**.`);
				message.channel.send(`Join log is now **enable** in this channel **${message.guild.channels.get(message.channel.id)}**.`);
			}
		} else {
			client.mysql.query(`UPDATE guilds SET joinlog = "${message.channel.id}" WHERE g_id = "${message.guild.id}"`);
			message.channel.send(`Join log is now **enable** in this channel **${message.guild.channels.get(message.channel.id)}**.`);
		}
		return true;
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 8,
	type: 2
};

exports.help = {
	name: `joinlog`,
	description: `Enable/disable join-log.`,
	usage: `${client.settings.prefix}joinlog`
};
