exports.run = (client, message, args) => {
	if(!args.split(" ")[0]) {
		message.channel.send(":grey_question: $$tag <name>\n:grey_question: $$tagadd <name> <content>\n:grey_question: $$tagdelete <name>\n:grey_question: $$taglist\n:grey_question: $$taginfo <name>");
	} else {
		client.mysql.query(`SELECT * FROM tags WHERE g_id = "${message.guild.id}" AND name = "${args.split(" ")[0]}"`, (err, rows) => {
			if(err) return system.log(err, "error");

			if(rows[0]) {
				var text = rows[0].content;
				text = text.split("{u-name}").join(message.author.username);
				text = text.split("{u-id}").join(message.author.id);
				text = text.split("{u-mention}").join(`<@${message.author.id}>`);
				text = text.split("{u-disc}").join(message.author.discriminator);
				text = text.split("{c-name}").join(message.channel.name);
				text = text.split("{c-id}").join(message.channel.id);
				text = text.split("{c-mention}").join(`#${message.channel.name}`);
				text = text.split("{c-topic}").join(message.channel.topic);
				message.channel.send(text);
			}
			return true;
		});
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 5
};

exports.help = {
	name: `tag`,
	description: `Show a tag.`,
	usage: `${client.settings.prefix}tag <tag name>`
};
