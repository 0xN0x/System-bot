var colog = require('colog');
var moment = require('moment');

module.exports = (member) => {
  system.log(`Remove user ${member.user.username} in ${member.guild.name}(${member.guild.id})`, 'info');

  client.mysql.query('SELECT * FROM guilds WHERE g_id = '+member.guild.id+'', function(err, rows, fields) {
    if (rows && rows[0].joinlog && member.guild.channels.get(rows[0].joinlog)) {
      logchannel = client.channels.get(rows[0].joinlog);
      logchannel.send({
        embed: {
          author: {name: member.user.username, icon_url: member.user.avatarURL},
          description: 'Remove member.',
          timestamp: moment(),
          color: 0xcc3333
        }
      });
    }
  });
};
