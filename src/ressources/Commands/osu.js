const { RichEmbed } = require('discord.js');

var mod = {
	"": "0",
	"basic": "0",
	"taiko": "1",
	"CTB": "2",
	"mania": "3"
}

exports.run = (client, message, args) => {
	const embed = new RichEmbed()
		.setImage('http://lemmmy.pw/osusig/sig.php?colour=hexffcc22&uname='+args.split(' ')[0]+'&mode='+mod[args.split(' ')[1]]+'&pp=0&flagshadow&flagstroke&darkheader&avatarrounding=4&onlineindicator=2&xpbar');
	message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `osu`,
  description: `Get osu account informations.`,
  usage: `${client.settings.prefix}osu <osu username> [taiko|CTB|mania]`
};

