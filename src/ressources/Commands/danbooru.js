var http = require('http');
var banned_tags = ['child', 'childs', 'loli', 'lolis', 'shota', 'shotacon', 'childporn', 'youngs', 'young']

exports.run = (client, message, args) => {
	var url = '/posts.json?random=true&tags=';
	if (!args) url = '/posts.json?random=true';
	else {
		if (banned_tags.indexOf(args.toLowerCase()) > -1 ) return system.shortsend(message.channel, `This tag isn't allowed.`)
		url += args.split(' ').join('+');
	}

	var page;
	var options = {
	  host: 'danbooru.donmai.us',
	  port: 80,
	  path: url
	};
	var req = http.request(options, function(res) {
		res.on("data", function (chunk) {
			page += chunk;
			page = page.replace('undefined', '');
		});
		res.on("end", function() {
			let out = JSON.parse(page)
			if (out.length > 0) {
				let post = out[0];
				message.channel.send(`https://danbooru.donmai.us${post.file_url}`)
			}
			else return message.channel.send('No images found.');
		});
	});
	req.end();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 6
};

exports.help = {
  name: `danbooru`,
  description: `Search image on danbooru.donmai.us (only on NSFW channel).`,
  usage: `${client.settings.prefix}danbooru [tag]`
};
