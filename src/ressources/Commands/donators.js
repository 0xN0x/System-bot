exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      author: {
        name: "Big thanks to:"
      },
      description:
`• Renard#9638 = 15.00$
• Pepit0Mc#5118 = 11.15$
• Emad = 10.00$
• Werewolf#6101 = 8.40$
• Feuri#8528 = 5.10$
• Chomusuke = 4.00$
• ShiiroNeko#0398 = 3.34$
• Loupio#0296 = 2.83$ `,
      color: 0xFFFFFF
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 1
};

exports.help = {
  name: `donators`,
  description: `Show all donators.`,
  usage: `${client.settings.prefix}donators`
};
