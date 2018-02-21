var http = require("http");

exports.run = (client, message) => {
	http.get("http://random.cat/meow", (res) => {
		var body = "";
		res.on("data", (chunk) => {
			body += chunk;
		});
		res.on("end", () => {
			let output = JSON.parse(body);
			message.channel.send({
				embed: {
					image: { url: output.file },
					color: 0xFFFFFF
				}
			});
		});
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 4
};

exports.help = {
	name: `cat`,
	description: `Random cat pictures.`,
	usage: `${client.settings.prefix}cat`
};
