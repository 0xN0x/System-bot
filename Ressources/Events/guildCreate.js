var colog = require('colog');

module.exports = (guild) => {
  client.mysql.query('SELECT * FROM guilds WHERE g_id = "'+guild.id+'"', function(err, rows, fields) {
    if(!rows[0]) client.mysql.query('INSERT INTO guilds SET ?', {g_id: guild.id, prefix: '$$', levelup: '1'});
  });
  if (guild.owner.id === "210127894154838016") return;
  system.updateGuild();
  system.post.newguild(guild);
  if (guild.defaultChannel !== undefined) {
    guild.defaultChannel.send({
      embed: {
        author: {name: `System`, icon_url: client.user.avatarURL, url: `http://wolver.xyz`},
        description: `**Thanks for inviting me in this place :3**\n\nYou can use \`$$help\` too see my command.\nIf you need help with the bot, have a suggestion, or just want to have the features announcement, you can join my support\n[Support](https://discord.gg/wfTrpkg)`,
        color: 0xFFFFFF
      }
    });
  }
  colog.log(colog.color(`[${client.options.shardId+1}/${client.options.shardCount}] > `, `yellow`)+colog.color(`New guild : ${guild.name} (${guild.id})`, `cyan`));
};
