var colog = require('colog');

module.exports = (guild) => {
  client.mysql.query('SELECT * FROM guilds WHERE g_id = "'+guild.id+'"', function(err, rows, fields) {
    if(rows[0]) client.mysql.query(`DELETE FROM guilds WHERE g_id = "${guild.id}"`);
  });
  system.updateGuild();
  system.post.deleteguild(guild);

  system.log(`Remove guild : ${guild.name} (${guild.id})`, 'info');
};
