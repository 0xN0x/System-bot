var exec = require("child_process").exec;

exports.run = (client, message, args) => {
	exec(args, (err, stdout, stderr) => {
		if(stderr) return system.log(stderr, "error");
		if(!err) message.channel.send(`\`\`\`bash\n${stdout}\n\`\`\``);

		return true;
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 31,
	type: 1
};

exports.help = {
	name: `exec`,
	description: ``,
	usage: `${client.settings.prefix}exec <bash>`
};
