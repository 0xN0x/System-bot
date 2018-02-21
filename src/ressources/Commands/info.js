const { RichEmbed } = require("discord.js");

exports.run = (client, message) => {
	var unit = ["", "K", "M", "G", "T", "P"];
	function bytesToSize(input, precision) {
		var index = Math.floor(Math.log(input) / Math.log(1024));
		if(unit >= unit.length) return `${input} B`;
		return `${(input / Math.pow(1024, index)).toFixed(precision)} ${unit[index]}B`;
	}

	client.shard.fetchClientValues("guilds.size").then(guilds => {
		client.shard.fetchClientValues("channels.size").then(channels => {
			client.shard.fetchClientValues("users.size").then(users => {
				const embed = new RichEmbed()
					.setColor("#FFFFFE")
					.setDescription(`●▬▬ **${client.user.username} statistics** ▬▬●`)
					.addField("❯ Guilds", guilds.reduce((prev, val) => prev + val, 0), true)
					.addField("❯ Channels", channels.reduce((prev, val) => prev + val, 0), true)
					.addField("❯ Users", users.reduce((prev, val) => prev + val, 0), true)
					.addField("❯ RAM", bytesToSize(process.memoryUsage().rss, 3), true)
					.addField("❯ Links", `[Website](${client.settings.website})\n[Support](${client.settings.support})\n[Invite](${client.settings.invite})`, true)
					.setFooter(`© ${new Date().getFullYear()} ${client.settings.author}`)
					.setTimestamp();
				message.channel.send({ embed });
			});
		});
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["stats"],
	permLevel: 1,
	type: 1
};

exports.help = {
	name: "info",
	description: "Show all statistics of the bot.",
	usage: `${client.settings.prefix}info`
};
