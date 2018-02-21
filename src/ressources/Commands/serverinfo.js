exports.run = (client, message) => {
	message.channel.send({
		embed: {
			author: { name: `${message.guild.name}'s informations` },
			fields: [{
				name: "Name",
				value: message.guild.name,
				inline: true
			}, {
				name: "Owner",
				value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
				inline: true
			}, {
				name: "ID",
				value: message.guild.id,
				inline: true
			}, {
				name: "Region",
				value: message.guild.region,
				inline: true
			}, {
				name: "Members",
				value: `${message.guild.members.filter(mb => mb.user.bot === false).size} users/${message.guild.members.filter(mb => mb.user.bot === true).size} bots`,
				inline: true
			}, {
				name: "Text Channels",
				value: message.guild.channels.findAll("type", "text").length,
				inline: true
			}, {
				name: "Voice Channels",
				value: message.guild.channels.findAll("type", "voice").length,
				inline: true
			}, {
				name: "Roles",
				value: `${message.guild.roles.size}`,
				inline: true
			}, {
				name: "Emojis",
				value: `${message.guild.emojis.size}`,
				inline: true
			}],
			thumbnail: { url: `${message.guild.iconURL ? message.guild.iconURL : ""}` },
			color: 0xFFFFFF
		}
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["sinfo"],
	permLevel: 1,
	type: 5
};

exports.help = {
	name: "serverinfo",
	description: "Server information.",
	usage: `${client.settings.prefix}serverinfo`
};
