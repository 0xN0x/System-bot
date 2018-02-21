exports.run = (client, message, args) => {
	function punch(channel, sender, receiver) {
		var img = system.findImage("punch");
		return channel.send(`<@${receiver.id}>, you got punched by **${sender.username}**`, {
			file: {
				attachment: img[0],
				name: `photo.${img[1]}`
			}
		});
	}
	function selfpunch(channel, sender) {
		var img = system.findImage("punch_self");

		return channel.send(`<@${sender.id}>, you got punched by **yourself**`, {
			file: {
				attachment: img[0],
				name: `photo.${img[1]}`
			}
		});
	}

	if(message.mentions.users.first() && message.mentions.users.first().id === message.author.id) return selfpunch(message.channel, message.author);
	else if(message.mentions.users.first()) return punch(message.channel, message.author, message.mentions.users.first());
	else if(args && system.getUser(message, args)) return punch(message.channel, message.author, system.getUser(message, args).user);
	else return message.channel.send(`Try with : \`$$punch <user>\``);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 4
};

exports.help = {
	name: `punch`,
	description: `Punch someone.`,
	usage: `${client.settings.prefix}punch <user>`
};
