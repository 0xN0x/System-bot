const Discord = require('discord.js');

exports.run = (client, message, args) => {
  client.mysql.query(`SELECT * FROM welcome WHERE gID = '${message.guild.id}'`, function(err, rows, fields) {
    var state = false;
    if (rows && rows[0]) state = true;

    const embeded = new Discord.RichEmbed()
      .setColor('#fffffe')
      .setTitle('Choose an action !')
      .setDescription(`[A] Enable/Disable welcome message\n${state ? "[B] Edit welcome message\n[C] Test welcome message" : ""}`);
    message.channel.send(
      {embed: embeded}
    ).then(msg => {
        msg.react('🇦').then(em => msg.react('🇧').then(em => msg.react('🇨')));
        const filter = (reaction, user) => (reaction.emoji.name === '🇦' || reaction.emoji.name === '🇧' || reaction.emoji.name === '🇨') && user.id === message.author.id
        const collector = msg.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', r => {
			if (r.emoji.name === "🇦") {
				if (state) {
					// If welcome message is already enabled, disable it
					client.mysql.query(`DELETE FROM welcome WHERE gID = '${message.guild.id}'`);
				} else {
					// If welcome message isn't already enabled, enable it
					client.mysql.query(`INSERT INTO welcome SET ?`, {gID: message.guild.id, cID: message.channel.id, message: "<:welcome:408337102779056131> Welcome {{user}} in {{servername}} !"});
				}
				const embeded = new Discord.RichEmbed()
					.setColor('#fffffe')
					.setTitle(`Welcome is now ${state ? 'disable' : 'enable'}`);
				if (!state) embeded.addField('Default welcome message', "<:welcome:408337102779056131> Welcome {{user}} in {{servername}} !");
				message.channel.send({embed: embeded});
				msg.delete()
				collector.stop()
			} else if (r.emoji.name === "🇧") {
				const embeded = new Discord.RichEmbed()
					.setColor('#fffffe')
					.setTitle('Edit welcome message')
					.addField('Old welcome message', rows[0].message)
					.addField('New welcome message', "Type the new message");
				message.channel.send({embed: embeded});
				const msg_filter = m => m.author.id === message.author.id && m.channel.id === message.channel.id
				const msg_collector = message.channel.createMessageCollector(msg_filter, { time: 120000 });
				msg_collector.on('collect', m => {
					msg.delete()
					const embeded = new Discord.RichEmbed()
						.setColor('#fffffe')
						.setTitle(':white_check_mark: Message updated')
						.addField('New welcome message', m.content);
					message.channel.send({embed: embeded});
					client.mysql.query(`UPDATE welcome SET message = '${m.content}' WHERE gID = '${message.guild.id}'`)
					msg_collector.stop();
				});

				collector.on('end', collected => {if (collected.size === 0) return message.channel.send('The delay is passed.')});
				collector.stop()
			} else if (r.emoji.name === "🇨") {
				msg.delete()
				welcome = rows[0].message.split('{{user}}').join(`<@${message.author.id}>`).split('{{servername}}').join(`${message.guild.name}`);
				message.channel.send(welcome)
				collector.stop()
			}
        });
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 31,
  type: 2
};

exports.help = {
  name: `welcome`,
  description: `Add/Edit/Remove welcome message.`,
  usage: `${client.settings.prefix}welcome`
};
