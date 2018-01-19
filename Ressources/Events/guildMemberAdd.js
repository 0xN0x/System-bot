var colog = require('colog');
var moment = require('moment');

module.exports = (member) => {
  //client.mysql.query(`UPDATE level SET presence = 0 WHERE u_id = ${member.user.id} AND g_id = ${member.guild.id}`);
  client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${member.guild.id}"`, function(err, rows, fields) {
    if (rows && rows[0] && (!rows[0].joinlog || !client.channels.get(rows[0].joinlog))) {}
    else {
      logchannel = client.channels.get(rows[0].joinlog);
      logchannel.send({
        embed: {
          author: {name: member.user.username, icon_url: member.user.avatarURL},
          description: 'New member.',
          timestamp: moment(),
          color: 0x00990d
        }
      });
    }
    if (rows && rows[0] && rows[0].logs === "1") {
      member.guild.channels.find('name', 'logs').send({
        embed: {
          author: {name: `${member.guild.name}`,icon_url: member.guild.iconURL},
          description: `**New Member: ${member} ${member.user.username}#${member.user.discriminator}**`,
          footer: {text: `ID : ${member.id}`},
          timestamp: moment(),
          color: 0x00990d
        }
      });
    }
  });
  if (member.guild.id === "229664634808958986") {
    member.addRole('241575048937340929');
  }
};
