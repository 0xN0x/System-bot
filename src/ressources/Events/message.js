let lastcmd = {};

module.exports = message => {
	if(message.author.bot) return false;
	if(message.channel.type === "dm") {
		return message.channel.send("I do not respond to Direct Message.\nSo you can join my support for testing my commands ! :smile: https://discord.gg/wfTrpkg");
	}
	if(!message.guild.member(client.user).hasPermission("SEND_MESSAGES")) return message.author.send(`I don"t have permission to send message here. Please ask an administrator.`);

	var patt = new RegExp("((http:\/\/)||(https://))(discord.gg/)");
	if(patt.test(message.content) === true) {
		if(message.guild.id === "229664634808958986" && message.owner.id !== client.settings.ownerid) {
			message.delete();
			message.channel.send(`<@${message.author.id}>, Sending invite is not allowed`);
			message.member.addRole("298499431081312256");
		}
	}


	client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${message.guild.id}"`, (err, rows) => {
		if(err) return system.log(err, "error");

		if(rows && rows[0]) {
			if(rows[0].active === 0) {
				client.mysql.query(`UPDATE guilds SET active = 1 WHERE g_id = ${message.guild.id}`);
			}
			if(rows[0].prefix === "$$") var replace = "$$$";
			else replace = rows[0].prefix;
			if(message.content.startsWith(`<@${client.user.id}>`)) message.content = message.content.replace(`<@${client.user.id}> `, replace);
			if(!message.content.startsWith(rows[0].prefix)) return false;
			let command = message.content.split(" ")[0].slice(rows[0].prefix.length);
			let params = message.content.split(" ").slice(1).join(" ");
			let cmd;

			if(client.commands.has(command)) {
				system.log(`[${message.guild.name}] ${command}`, "info");
				cmd = client.commands.get(command);
			} else if(client.aliases.has(command)) {
				system.log(`[${message.guild.name}] ${command}`, "info");
				cmd = client.commands.get(client.aliases.get(command));
			}
			if(cmd) {
				if(lastcmd[message.author.id] && message.createdTimestamp - lastcmd[message.author.id] < 2000) return system.shortsend(message.channel, "Wait 2 seconds between your commands", 2000);
				lastcmd[message.author.id] = message.createdTimestamp;

				if(cmd.conf.type === 6 && !message.channel.nsfw) return system.shortsend(message.channel, "This command is not enable in this channel.");

				if(system.permission(cmd.conf.permLevel)[1] === "DEV" && message.author.id !== client.settings.ownerid) return false;

				if(system.permission(cmd.conf.permLevel)[1] === "DEV" && message.author.id === client.settings.ownerid) {
					cmd.run(client, message, params, rows[0]);
				} else if(system.permission(cmd.conf.permLevel)[1] === false ||
					!system.permission(cmd.conf.permLevel)[1] ||
					message.member.hasPermission(system.permission(cmd.conf.permLevel)[1])) {
					cmd.run(client, message, params, rows[0]);
				} else if(!message.member.hasPermission(system.permission(cmd.conf.permLevel)[1])) {
					return system.shortsend(message.channel, `:x: - You need \`${system.permission(cmd.conf.permLevel)[1]}\` permission to do this.`);
				}
			}
		} else {
			client.mysql.query("INSERT INTO guilds SET ?", { g_id: message.guild.id, prefix: "$$" });
			system.log("Need upgrade DB", "error");
		}

		return true;
	});

	return true;
};
