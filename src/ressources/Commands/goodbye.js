const Discord = require('discord.js');

exports.run = (client, message, args) => {
	client.mysql.query(`SELECT * FROM goodbye WHERE gID = '${message.guild.id}'`, function(err, rows) {
		var state = false;
		if (rows && rows[0]) state = true;

		const embed = new Discord.RichEmbed()
			.setColor('#fffffe')
			.setTitle('Choose an action !')
			.setDescription(`[A] ${state ? "Disable" : "Enable"} goodbye message\n${state ? "[B] Edit goodbye message\n[C] Test goodbye message" : ""}`);
		message.channel.send({ embed }).then(msg => {
			msg.react('🇦').then(em => {
				if (state) msg.react('🇧').then(em => {
					if (state) msg.react('🇨')
				})
			});
			const filter = (reaction, user) => (reaction.emoji.name === '🇦' || reaction.emoji.name === '🇧' || reaction.emoji.name === '🇨') && user.id === message.author.id
			const collector = msg.createReactionCollector(filter, { time: 15000 });
			collector.on('collect', r => {
				if (r.emoji.name === "🇦") {
					if (state) {
						// If goodbye message is already enabled, disable it
						client.mysql.query(`DELETE FROM goodbye WHERE gID = '${message.guild.id}'`);
					} else {
						// If goodbye message isn't already enabled, enable it
						client.mysql.query(`INSERT INTO goodbye SET ?`, {gID: message.guild.id, cID: message.channel.id, message: ":cry: Goodbye **{{username}}**, see you later in **{{servername}}**"});
					}
					const embed = new Discord.RichEmbed()
						.setColor('#fffffe')
						.setDescription(`Goodbye is now ${state ? 'disable' : 'enable'} in **#${message.channel.name}**`);

					message.channel.send({ embed });
					msg.delete()
					collector.stop()
				} else if (r.emoji.name === "🇧") {
					const embed = new Discord.RichEmbed()
						.setColor('#fffffe')
						.setTitle('Edit goodbye message')
						.addField('Old goodbye message', rows[0].message)
						.addField('New goodbye message', "Type the new message");
					message.channel.send({ embed });

					const msg_filter = m => m.author.id === message.author.id && m.channel.id === message.channel.id;
					const msg_collector = message.channel.createMessageCollector(msg_filter, { time: 120000 });
					msg_collector.on('collect', m => {
						msg.delete()
						const embed = new Discord.RichEmbed()
							.setColor('#fffffe')
							.setTitle(':white_check_mark: Message updated')
							.addField('New goodbye message', m.content);
						message.channel.send({ embed });
						client.mysql.query(`UPDATE goodbye SET message = '${m.content}' WHERE gID = '${message.guild.id}'`)
						msg_collector.stop();
					});

					msg_collector.on('end', collected => {if (collected.size === 0) return message.channel.send(':x: Menu has closed due to inactivity.')});
					collector.stop()
				} else if (r.emoji.name === "🇨") {
					msg.delete()
					goodbye = rows[0].message.split('{{user}}').join(`<@${message.author.id}>`).split('{{servername}}').join(message.guild.name).split('{{username}}').join(message.author.username);
					message.channel.send(goodbye);
					collector.stop()
				}
			});
			
			collector.on('end', collected => {if (collected.size === 0) return message.channel.send(':x: Menu has closed due to inactivity.')});
		});
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 9,
	type: 2
};

exports.help = {
	name: `goodbye`,
	description: `Add/Edit/Remove goodbye message.`,
	usage: `${client.settings.prefix}goodbye`
};
