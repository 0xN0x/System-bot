var moment = require('moment');

exports.run = (client, message, args) => {
	var unit = ['', 'K', 'M', 'G', 'T', 'P'];
	function bytesToSize(input, precision) {
		var index = Math.floor(Math.log(input) / Math.log(1024));
		if (unit >= unit.length) return input + ' B';
		return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B'
	}

	client.shard.fetchClientValues('voiceConnections.size').then(voice => {
		client.shard.fetchClientValues('guilds.size').then(guilds => {
			client.shard.fetchClientValues('channels.size').then(channels => {
				client.shard.fetchClientValues('users.size').then(users => {
					message.channel.send({
						embed: {
							author: {
								name: `●▬▬ System statistics ▬▬●`,
								icon_url: client.user.avatarURL
							},
							description: `${client.user.username} is a Discord bot developped by <:hypesquad:314068430854684672>${client.settings.author} using Discord.js`,
							fields: [{
								name: 'Guilds',
								value: guilds.reduce((prev, val) => prev + val, 0),
								inline: true
							}, {
								name: 'Channels',
								value: channels.reduce((prev, val) => prev + val, 0),
								inline: true
							}, {
								name: 'Users',
								value: users.reduce((prev, val) => prev + val, 0),
								inline: true
							}, {
								name: 'Voice Connection',
								value: voice.reduce((prev, val) => prev + val, 0),
								inline: true
							}, {
								name: 'RAM',
								value: bytesToSize(process.memoryUsage().rss, 3),
								inline: true
							}, {
								name: 'Links',
								value: `[Website](http://wolver.xyz)\n[Support](${client.settings.support})\n[Invite](${client.settings.invite})`,
								inline: true
							}],
							timestamp: moment(),
							color: 0xFFFFFF
						}
					});
				});
			});
		});
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stats'],
  permLevel: 1,
	type: 1
};

exports.help = {
  name: 'info',
  description: 'Show all statistics of the bot.',
  usage: `${client.settings.prefix}info`
};
