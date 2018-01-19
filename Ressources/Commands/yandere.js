var https = require('https');
var banned_tags = ['child', 'childs', 'loli', 'lolis', 'shota', 'shotacon', 'childporn', 'youngs', 'young']


exports.run = (client, message, args) => {
  client.mysql.query('SELECT * FROM guilds WHERE g_id = '+message.guild.id+'', function(err, rows, fields) {
		if (rows[0] && (!rows[0].NSFW || rows[0].NSFW.indexOf(message.channel.id) < 0)) return system.shortsend(message.channel, 'This command is not enable in this channel.');

		var url = '/post.json?limit=100&tags=';
		if (!args) url = '/post.json?limit=100';
		else {
			if (banned_tags.indexOf(args.toLowerCase()) > -1 ) return system.shortsend(message.channel, `This tag isn't allowed.`)
			url += args.split(' ').join('+');
		}

		var page;
		var options = {
		  host: 'yande.re',
		  port: 443,
		  path: url
		};
		var req = https.request(options, function(res) {
		 	res.on("data", function (chunk) {
		 	  page += chunk;
        page = page.replace('undefined', '');
		  });
		  res.on("end", function() {
        let out = JSON.parse(page)
				if (out.length > 0) {
          let post = out[Math.floor((Math.random()*(out.length-1)))];
          system.send(message.channel, post.file_url)
					/*system.send(m.channel, "", null, {
						embed: {
							//description: `tags: ${tag}`,
							author: {name: m.author.username, icon_url: m.author.avatarURL},
							image: {
								url: post.file_url
							},
							color: 0xFFFFFF
						}
					});*/
				}
        else return system.send(message.channel, 'No images found.');
			});
		});
		req.end();
	});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 6
};

exports.help = {
  name: `yandere`,
  description: `Search image on Yande.re (only on NSFW channel).`,
  usage: `${client.settings.prefix}yandere [tag]`
};
