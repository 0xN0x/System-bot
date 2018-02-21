exports.run = (client, m, args) => {
  m.channel.send({
		embed: {
			author: {name: m.guild.name+'\'s informations'},
			fields: [{
				name: 'Name',
				value: m.guild.name,
				inline: true
			}, {
				name: 'Owner',
				value: m.guild.owner.user.username+'#'+m.guild.owner.user.discriminator,
				inline: true
			},{
				name: 'ID',
				value: m.guild.id,
				inline: true
			},{
				name: 'Region',
				value: m.guild.region,
				inline: true
			},{
				name: 'Members',
				value: `${m.guild.members.filter(mb => mb.user.bot === false).size} users/${m.guild.members.filter(mb => mb.user.bot === true).size} bots`,
				inline: true
			},{
				name: 'Text Channels',
				value: m.guild.channels.findAll('type', 'text').length,
				inline: true
			},{
				name: 'Voice Channels',
				value: m.guild.channels.findAll('type', 'voice').length,
				inline: true
			},{
				name: 'Roles',
				value: `${m.guild.roles.size}`,
				inline: true
			},{
				name: 'Emojis',
				value: `${m.guild.emojis.size}`,
				inline: true
			}],
			thumbnail: {
				url: `${m.guild.iconURL ? m.guild.iconURL : ""}`
			},
			color: 0xFFFFFF
		}
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sinfo'],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: 'serverinfo',
  description: 'Server information.',
  usage: `${client.settings.prefix}serverinfo`
};
