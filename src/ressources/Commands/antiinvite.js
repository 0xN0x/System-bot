exports.run = (client, message) => {
	if(message.guild.antiinvite === undefined) {
		client.mysql.query(`SELECT * FROM antiinvite WHERE gID = '${message.guild.id}'`, (err, rows) => {
			if(err) return system.log(err, "error");

			if(rows && rows[0]) {
				client.mysql.query(`DELETE FROM antiinvite WHERE sID = '${message.guild.id}'`);
				message.guild.antiinvite = 0;
				message.channel.send(":information_source: Anti-invite is now disabled!");
			} else {
				client.mysql.query("INSERT INTO antiinvite SET ?", { sID: message.guild.id });
				message.guild.antiinvite = 1;
				message.channel.send(":information_source: Anti-invite is now enabled!");
			}
			return true;
		});
	} else if(message.guild.antiinvite) {
		client.mysql.query(`DELETE FROM antiinvite WHERE sID = '${message.guild.id}'`);
		message.guild.antiinvite = 0;
		message.channel.send(":information_source: Anti-invite is now disabled!");
	} else if(!message.guild.antiinvite) {
		client.mysql.query("INSERT INTO antiinvite SET ?", { sID: message.guild.id });
		message.guild.antiinvite = 1;
		message.channel.send(":information_source: Anti-invite is now enabled!");
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 31,
	type: 2
};

exports.help = {
	name: `antiinvite`,
	description: `Enable/Disable anti-invite.`,
	usage: `${client.settings.prefix}antiinvite`
};
