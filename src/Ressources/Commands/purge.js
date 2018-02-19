exports.run = (client, message, args) => {
  if (!message.content.split(' ')[1]) return;
  if (!Number.isInteger(Number(message.content.split(' ')[1]))) return;
  let count = Number(message.content.split(' ')[1]);
  if (count < 2) return;
  if (count > 99) count = 99;
  message.delete();
  message.channel.bulkDelete(count+1, true).then(
    system.shortsend(message.channel, `:ok_hand: ${message.content.split(' ')[1]} messages has been deleted.`)
  ).catch(e => {
    if(e.code === 10008) {
      message.channel.send(':x: - A bot can only bulk delete messages that are under 14 days old.');
    } else {
      console.log(e)
    }
  }) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 14,
  type: 2
};

exports.help = {
  name: `purge`,
  description: `Delete x messages.`,
  usage: `${client.settings.prefix}purge <count of message>`
};