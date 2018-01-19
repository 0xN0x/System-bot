var parseString = require('xml2js').parseString;
var banned_tags = ['child', 'childs', 'loli', 'lolis', 'shota', 'shotacon', 'childporn', 'youngs', 'young']

exports.run = (client, message, args) => {
  client.mysql.query('SELECT * FROM guilds WHERE g_id = '+message.guild.id+'', function(err, rows, fields) {
		if (rows[0] && (!rows[0].NSFW || rows[0].NSFW.indexOf(message.channel.id) < 0)) return system.shortsend(message.channel, 'This command is not enable in this channel.');

		var url = '/index.php?page=dapi&s=post&q=index&limit=1000&tags=';
		if (args === null) {
			url = '/index.php?page=dapi&s=post&q=index&limit=1000'
		} else {
			args = args.split(' ').join('+');
			if (banned_tags.indexOf(args.toLowerCase()) > -1 ) return system.shortsend(message.channel, `This tag isn't allowed.`)
			url = url+args;
		}
		var page;
		var http = require('https');
		  var options = {
		    host: 'rule34.xxx',
		    port: 443,
			  path: url
		  };
		  var req = http.request(options, function(res) {
		  	res.on("data", function (chunk) {
		   	page += chunk;
				page = page.replace('undefined', '');
		   });
		   res.on("end", function() {
				parseString(page, function (err, result) {
					page = page.split('&').join(', ');
					page = result;
				});
				if (page.posts['$'].count !== '0') {
					//console.log(page.posts['$'])
					if (page.posts['$'].count > 1000) {
						post = page.posts.post[Math.floor((Math.random()*(1000-1)))]['$'];
						link = (post.file_url)
						tag = post.tags;
					} else {
						post = page.posts.post[Math.floor((Math.random()*(page.posts['$'].count-1)))]['$'];
						link = (post.file_url)
						tag = post.tags;
					}
					message.channel.send(`${link}`)
				}
				else {
					message.channel.send('No images found.')
				}
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
  name: `rule34`,
  description: `Search image on Rule34.xxx (only on NSFW channel).`,
  usage: `${client.settings.prefix}rule34 [tag]`
};
