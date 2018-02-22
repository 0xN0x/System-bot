exports.run = (client, message, args) => {
	  var txt = "";
	  var unit = ['', 'K', 'M', 'G', 'T', 'P'];
		function bytesToSize(input, precision) {
		var index = Math.floor(Math.log(input) / Math.log(1024));
		if (unit >= unit.length) return input + ' B';
		return (input / Math.pow(1024, index)).toFixed(precision) + ' ' + unit[index] + 'B';
		};
	client.shard.broadcastEval(`process.memoryUsage().rss`).then(resp => {
		client.shard.fetchClientValues('guilds.size').then(guilds => {
	    client.shard.fetchClientValues('channels.size').then(channels => {
	      client.shard.fetchClientValues('users.size').then(users => {
	        let shardsfields = [];
	        for (var i=0;i<client.options.shardCount;i++) {
	          txt += `Shard ${i+1} = G: ${guilds[i]} • C: ${channels[i]} • U: ${users[i]} • R: ${bytesToSize(resp[i, 3])}\n`
	        }

					message.channel.send({
						embed: {
							author: {
								name: `●▬▬ ${client.options.shardCount} shards ▬▬●`,
								icon_url: client.user.avatarURL
							},
							description: txt,
							footer: {
								text: `Shard ${client.options.shardId+1}/${client.options.shardCount} | Requested by ${message.author.username}`
							},
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
	aliases: [],
	permLevel: 1,
	type: 1
};

exports.help = {
	name: `shards`,
	description: `Shards info`,
	usage: `${client.settings.prefix}shards`
};
