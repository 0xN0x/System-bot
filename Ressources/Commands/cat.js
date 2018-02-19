var http = require('http');

exports.run = (client, message, args) => {
	http.get('http://random.cat/meow', function (res) {
		var body = '';
		res.on('data', function (chunk) {
	   	body += chunk;
	  });
		res.on('end', function () {
			let output = JSON.parse(body);
			system.send(message.channel, "", null, {
				embed: {
					image: {
						url: output.file
					},
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
