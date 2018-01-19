exports.run = (client, message, args) => {
  /*bot.connection.query(`SELECT * FROM guilds WHERE g_id = "${m.guild.id}"`, function(err, raws, fields) {
    if (raws[0].levelup === 0) return system.send(m.channel, `This command is not enable in this channel.`).then(msg => msg.delete(5000));

    var text = '';
    bot.connection.query(`SELECT * FROM level WHERE g_id = "${m.guild.id}" AND presence = 0 ORDER BY total DESC`, function(err, rows, fields) {
      if (m.content.split(' ')[1]) {
        var min = (m.content.split(' ')[1]-1)*10;
      }
      else {
        var min = 0;
      }
      var max = min+10;
      if (!rows[min]) return;
      for (var i=min;i<max;i++) {
        if (rows[i]) {
          let level = parseInt(rows[i].level);
          let total = rows[i].total;
          let level1 = level+1;
          let _level = 60*(level1*level1)+(95*level1)-155;
          let __level = 60*(level*level)+(95*level)-155;
          let xp = total-__level;
          let xpneed = _level-__level; //f(x)=35x²+95x-130
          if(m.guild.member(rows[i].u_id)) {
            text += '**'+(i+1)+') Level '+rows[i].level+'** ('+(xp/xpneed*100).toFixed(0)+'%)'+' - ';
            text += '**'+m.guild.member(rows[i].u_id).user.username+'**\n';
          } else {
            bot.connection.query(`UPDATE level SET presence = 1 WHERE u_id = ${rows[i].u_id} AND g_id = ${m.guild.id}`);
            text += '**'+(i+1)+') Level '+rows[i].level+'** ('+(xp/xpneed*100).toFixed(0)+'%)'+' - ';
            text += '**Deleted User**\n';
          }
        }
      }
      m.channel.sendMessage("", {
        embed: {
          author: {name: m.guild.name+'\'s leaderboard', icon_url: m.guild.iconURL},
          description: text,
          color: 0x337AB7
        }
      });
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
  name: `rank`,
  description: `Show the leaderboard.`,
  usage: `${client.settings.prefix}rank [page]`
};
