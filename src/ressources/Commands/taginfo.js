exports.run = (client, message, args) => {
  client.mysql.query(`SELECT * FROM tags WHERE g_id = "${message.guild.id}" AND name = "${args.split(' ')[0]}"`, function(err, rows, fields) {
    if (rows[0]) {
      message.channel.send(`Author of \`${args.split(' ')[0]}\` is **${client.users.get(rows[0].u_id) ? client.users.get(rows[0].u_id).username : "Unknown (**"+rows[0].u_id+"**)"}**`)
    } else {
      message.channel.send(`This tag doesn't exist.`);
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `taginfo`,
  description: `Info about a tag.`,
  usage: `${client.settings.prefix}taginfo <tag name>`
};
