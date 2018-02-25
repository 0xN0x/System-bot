const { RichEmbed } = require("discord.js");

const donators = [
	{
		name: "Renard#9638",
		amount: "15.00"
	}, {
		name: "Pepit0Mc#5118",
		amount: "16.00"
	}, {
		name: "Emad",
		amount: "10.00"
	}, {
		name: "Werewolf#6101",
		amount: "8.40"
	}, {
		name: "Feuri#8528",
		amount: "5.10"
	}, {
		name: "Chomusuke",
		amount: "4.00"
	}, {
		name: "ShiiroNeko#0398",
		amount: "3.34"
	}, {
		name: "Loupio#0296",
		amount: "2.83"
	}
];

var txt = "";
donators.sort((a, b) => {
	return b.amount - a.amount;
}).forEach(donator => {
	txt += `• ${donator.name} = ${donator.amount}$\n`;
});

exports.run = (client, message) => {
	const embed = new RichEmbed()
		.setAuthor("Big thanks to:")
		.setDescription(txt)
		.setColor("#ffffff");

	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 1,
	type: 1
};

exports.help = {
	name: `donators`,
	description: `Show all donators.`,
	usage: `${client.settings.prefix}donators`
};
