exports.run = (client, message, args) => {
  if (!args.split(' ')[0]) return system.shortsend(message.channel, `:grey_question: $$tagdelete <name>`);
  else {
    client.mysql.query(`SELECT * FROM tags WHERE g_id = "${message.guild.id}" AND name = "${args.split(' ')[0]}"`, function(err, rows, fields) {
      if (rows[0]) {
        if (rows[0].u_id == message.author.id || message.member.hasPermission('ADMINISTRATOR')) {
          client.mysql.query(`DELETE FROM tags WHERE g_id = "${message.guild.id}" AND name = "${args.split(' ')[0]}"`, function(err, result) { });
          message.channel.send(`:white_check_mark: Tag \`${args.split(' ')[0]}\` has been deleted !`).then(message.delete());
        }
        else return system.shortsend(message.channel, `:no_entry_sign: You are not the creator of this tag.`);
      }
      else return system.shortsend(message.channel, `:no_entry_sign: This tag doesn't exist.`);
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
  name: `tagdelete`,
  description: `Delete a tag.`,
  usage: `${client.settings.prefix}tagdelete <name>`
};
