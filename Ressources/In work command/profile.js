exports.run = (client, message, args) => {
  /*bot.connection.query(`SELECT * FROM guilds WHERE g_id = "${m.guild.id}"`, function(err, raws, fields) {
    if (raws[0] && raws[0].levelup === 0) return system.shortsend(m.channel, `This command is not enable in this channel.`);

    var messagemention = m.mentions.users.first();
  	var userid;
  	var usern;
    var position;
    if (m.mentions.users.first()) {
      userid = m.mentions.users.first().id;
      usern = m.mentions.users.first().username;
      useravatar = m.mentions.users.first().avatarURL;}
    else if (suffix && system.getUser(m, suffix)) {
      userid = system.getUser(m, suffix).user.id;
      usern = system.getUser(m, suffix).user.username;
      useravatar = system.getUser(m, suffix).user.avatarURL;}
    else {
      userid = m.author.id;
      usern = m.author.username;
      useravatar = m.author.avatarURL;}

    bot.connection.query(`SELECT * FROM level WHERE g_id = "${m.guild.id}" AND presence = 0 ORDER BY total DESC`, function(err, rows, fields) {
      if (rows) {
        for (var i = 0; i<rows.length; i++) {
          if (rows[i] && rows[i].u_id === userid) {
            position = [i, rows.length];
          }
        }
      }
    });
  	bot.connection.query('SELECT * FROM level WHERE u_id = "'+userid+'" AND g_id = "'+m.guild.id+'"', function(err, rows, fields) {
  	  if (rows) {
  		  if (rows[0]) {
          let level = parseInt(rows[0].level);
  			  let total = rows[0].total;
  				let level1 = level+1;
  				let _level = 60*(level1*level1)+(95*level1)-155;
  				let __level = 60*(level*level)+(95*level)-155;
  				let xp = total-__level;
  				let xpneed = _level-__level; //f(x)=35x²+95x-130
  				m.channel.sendMessage("", {
  					embed: {
  						author: {name: `${usern}'s profile`, icon_url: useravatar},
  						description: `Level **${level}** (${(xp/xpneed*100).toFixed(2)}%)\nXP : **${xp}/${xpneed}**\nTotal xp : **${total}**\nRank : **${position[0] ? position[0]+1 : "1"}/${position[1] ? position[1] : "1"}**`,
  						color: 0x337AB7
  					}
  				});
  			} else {
  				var messagemention = m.mentions.users.first();
  				m.channel.sendMessage("", {
  					embed: {
  						author: {name: usern+'\'s profile', icon_url: useravatar},
  						description: `Level **1**\nXP : **0/275**\nTotal xp : **0**`,
  						color: 0x337AB7
  					}
  				});
  	    }
  		}
  	});
  });*/
  message.channel.send(":no_entry: Level module is temporary disabled.")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 3
};

exports.help = {
  name: `profile`,
  description: `Send your profile information.`,
  usage: `${client.settings.prefix}profile`
};
