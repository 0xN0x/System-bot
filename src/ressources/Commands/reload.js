exports.run = (client, message, args) => {
	let command;
	if(client.commands.has(args)) {
		command = args;
	} else if(client.aliases.has(args)) {
		command = client.aliases.get(args);
	}
	if(!command) {
		return message.channel.send(`I cannot find the command: ${args[0]}`);
	} else {
		message.channel.send(`Reloading: ${command}`).then(msg => {
			client.reload(command).then(() => {
				msg.edit(`Successfully reloaded: ${command}`);
				system.log(`Command reloaded: ${command}`, "debug");
			}).catch(err => {
				msg.edit(`Command reload failed: ${command}\n\`\`\`${err.stack}\`\`\``);
				return system.log(err, "error");
			});
		});
	}
	return true;
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [`r`],
	permLevel: 31,
	type: 5
};

exports.help = {
	name: `reload`,
	description: `Reloads the command file, if it\'s been updated or modified.`,
	usage: `${client.settings.prefix}reload <commandname>`
};
