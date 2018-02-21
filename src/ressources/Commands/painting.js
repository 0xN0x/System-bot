var Jimp = require("jimp");

exports.run = (client, message) => {
	if(message.mentions.users.first() && message.mentions.users.first().avatarURL) {
		var avatar = message.mentions.users.first().avatarURL;
	} else if(message.mentions.users.first()) {
		avatar = `${process.cwd()}/src/ressources/images/default.png`;
	} else if(message.author.avatarURL) {
		avatar = message.author.avatarURL;
	} else {
		avatar = `${process.cwd()}/src/ressources/images/default.png`;
	}

	Jimp.read(`${process.cwd()}/src/ressources/images/600x400white.jpg`, (err, lenna) => {
		if(err) return system.log(err, "error");
		Jimp.read(avatar, (err, image) => {
			if(err) return system.log(err, "error");
			image.resize(175, 135);
			lenna.composite(image, 213, 110);
			Jimp.read(`${process.cwd()}/src/ressources/images/tableau2.png`, (err, image2) => {
				if(err) return system.log(err, "error");
				lenna.composite(image2, 0, 0);
				lenna.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
					if(err) return system.log(err, "error");
					message.channel.send({
						file: {
							attachment: buffer,
							name: "image.png"
						}
					});
					return true;
				});
				return true;
			});
			return true;
		});
		return true;
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
	name: `painting`,
	description: `Make a painting of you.`,
	usage: `${client.settings.prefix}painting [user]`
};
