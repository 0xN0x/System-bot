var colog = require('colog');
const settings = require(`../../Core/settings.json`);

let lastcmd = {};

module.exports = message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    return message.channel.send("I do not respond to Direct Message.\nSo you can join my support for testing my commands ! :smile: https://discord.gg/wfTrpkg");
  }
  if (!message.guild.member(client.user).hasPermission("SEND_MESSAGES")) return message.author.send(`I don't have permission to send message here. Please ask an administrator.`);



  client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${message.guild.id}"`, function(err, rows, fields) {
    if (rows && rows[0]) {
      if (rows[0].active === 0) {
        client.mysql.query(`UPDATE guilds SET active = 1 WHERE g_id = ${message.guild.id}`);
      }
      if (rows[0].prefix === "$$") replace = "$$$"; else replace = rows[0].prefix;
      if (message.content.startsWith(`<@${client.user.id}>`)) message.content = message.content.replace(`<@${client.user.id}> `, replace);
      if (!message.content.startsWith(rows[0].prefix)) return;
      let command = message.content.split(' ')[0].slice(rows[0].prefix.length);
      let params = message.content.split(' ').slice(1).join(" ");
      let cmd;
      if (client.commands.has(command)) {
        colog.log(colog.color(`[${client.options.shardId+1}/${client.options.shardCount}] > `, `yellow`)+colog.color('['+message.guild.name+'] ', 'red')+colog.color(command, 'green'));
        cmd = client.commands.get(command);
      } else if (client.aliases.has(command)) {
        colog.log(colog.color(`[${client.options.shardId+1}/${client.options.shardCount}] > `, `yellow`)+colog.color('['+message.guild.name+'] ', 'red')+colog.color(command, 'green'));
        cmd = client.commands.get(client.aliases.get(command));
      }
      if (cmd) {
        if (lastcmd[message.author.id] && message.createdTimestamp-lastcmd[message.author.id] < 2000) return system.shortsend(message.channel, 'Wait 2 seconds between your commands', 2000);
        lastcmd[message.author.id] = message.createdTimestamp;
        /*if (rows[0].use_bot === 0) {
          client.mysql.query(`UPDATE guilds SET use_bot = 1 WHERE g_id = ${message.guild.id}`);
        }*/
        if (system.permission(cmd.conf.permLevel)[1] === "DEV" && message.author.id === client.settings.ownerid) {
          cmd.run(client, message, params, rows[0])
        } else if (system.permission(cmd.conf.permLevel)[1] === false
           || !system.permission(cmd.conf.permLevel)[1]
           || message.member.hasPermission(system.permission(cmd.conf.permLevel)[1])) {
          cmd.run(client, message, params, rows[0])
        } else if (!message.member.hasPermission(system.permission(cmd.conf.permLevel)[1])) {
          system.shortsend(message.channel, `:x: - You need \`${system.permission(cmd.conf.permLevel)[1]}\` permission to do this.`)
        }
      }
    } else {
      client.mysql.query('INSERT INTO guilds SET ?', {g_id: message.guild.id, prefix: "$$"});
      console.log('[ERROR] Need upgrade DB')
    }
  });
};
