var moment = require("moment");

module.exports = (member) => {
	system.log(`New user ${member.user.username} in ${member.guild.name}(${member.guild.id})`, "info");

	client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${member.guild.id}"`, (err, rows) => {
		if(err) return system.log(err, "error");

		if(rows && rows[0] && rows[0].joinlog && member.guild.channels.get(rows[0].joinlog)) {
			var logchannel = client.channels.get(rows[0].joinlog);
			logchannel.send({
				embed: {
					author: { name: member.user.username, icon_url: member.user.avatarURL },
					description: "New member.",
					timestamp: moment(),
					color: 0x00990d
				}
			});
		}
		return true;
	});
	if(member.guild.id === "229664634808958986") {
		member.addRole("241575048937340929");
	}
};
