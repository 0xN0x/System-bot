exports.run = (client, message, args) => {
  if (!args.split(' ')[1]) return system.shortsend(message.channel, ':grey_question: $$tagadd <name> <content>')
  else {
    client.mysql.query(`SELECT * FROM tags WHERE g_id = "${message.guild.id}" AND name = "${args.split(' ')[0]}"`, function(err, rows, fields) {
      if (err) console.log(err);
      if (rows[0]) {
        message.channel.send(':no_entry_sign: This tag already exist.').then(msg => msg.delete(7000));
      }
      else {
        client.mysql.query('INSERT INTO tags SET ?', {g_id: message.guild.id, u_id: message.author.id, name: args.split(' ')[0], content: args.substr(args.split(' ')[0].length+1), timestamp: message.createdTimestamp}, function(err, result) { if(err) console.log(err);});
        message.channel.send(`:white_check_mark: Tag \`${args.split(' ')[0]}\` successful created`).then(message.delete());
      }
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `tagadd`,
  description: `Create a tag.`,
  usage: `${client.settings.prefix}tagadd <name> <content>`
};
