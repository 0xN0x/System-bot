var mod = {
	"": "0",
	"basic": "0",
	"taiko": "1",
	"CTB": "2",
	"mania": "3"
}

exports.run = (client, message, args) => {
  message.channel.send({
    file: {
      attachment: 'http://lemmmy.pw/osusig/sig.php?colour=hexffcc22&uname='+args.split(' ')[0]+'&mode='+mod[args.split(' ')[1]]+'&pp=0&flagshadow&flagstroke&darkheader&avatarrounding=4&onlineindicator=2&xpbar',
      name: 'osu.png'
    }
  })
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
