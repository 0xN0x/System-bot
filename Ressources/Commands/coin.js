exports.run = (client, message, args) => {
  let coin = Math.round(Math.random()*1)+1;
	let flip = {
		"1":"Heads !",
		"2":"Tails !"
	}
	message.channel.send({
    embed: {
      description: flip[coin],
      header: {
				text: 'Flip a coin'
			},
			color: 0xFFFFFF
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `coin`,
  description: `Flip a coin.`,
  usage: `${client.settings.prefix}coin`
};
