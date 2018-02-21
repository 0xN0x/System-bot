exports.run = (client, message) => {
	var spliter = message.content.split(" ");
	if(!spliter[1]) {
		var roll = Math.round(Math.random() * (100 - 0)) + 0;
		message.channel.send(`:game_die: rolled **${roll}** !`);
	} else if(typeof parseInt(spliter[1]) === "number") {
		roll = Math.round(Math.random() * (spliter[1] - 0));
		if(isNaN(roll)) {
			message.channel.send("This is not number.");
		} else if(spliter[1] === "0") {
			message.channel.send("You can't make a roll with `max = 0`.");
		} else {
			message.channel.send(`:game_die: rolled **${roll}** !`);
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 5
};

exports.help = {
	name: `roll`,
	description: `Rolling.`,
	usage: `${client.settings.prefix}roll [max]`
};
