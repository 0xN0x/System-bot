var colog = require('colog');

module.exports = (guild) => {
  client.mysql.query('SELECT * FROM guilds WHERE g_id = "'+guild.id+'"', function(err, rows, fields) {
    if(!rows[0]) client.mysql.query('INSERT INTO guilds SET ?', {g_id: guild.id, prefix: '$$', levelup: '1'});
  });
  system.updateGuild();
  system.post.newguild(guild);

  system.log(`New guild : ${guild.name} (${guild.id})`, 'info');
}