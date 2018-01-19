var colog = require('colog');

module.exports = (guild) => {
  client.mysql.query('SELECT * FROM guilds WHERE g_id = "'+guild.id+'"', function(err, rows, fields) {
    if(rows[0]) {
      client.mysql.query(`DELETE FROM guilds WHERE g_id = "${guild.id}"`);
    }
  });
  if (!guild.owner || guild.owner.id === "210127894154838016") return;
  system.updateGuild();
  system.post.deleteguild(guild);
  colog.log(colog.color(`[${client.options.shardId+1}/${client.options.shardCount}] > `, `yellow`)+colog.color(`Remove guild : ${guild.name} (${guild.id})`, `cyan`));
};
