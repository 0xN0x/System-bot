exports.run = (client, message, args) => {
  message.author.send({
    embed: {
      author: {name: `Make a donation!`},
      description: `
Hi, i'm AkaNeko, the creator of System.

I'm a student and maintaining this bot is not free, I need to pay the server, the domain for the website, and I'm not talking about the amount of time I'm spending on it everyday. I do not want to be paid to make money, i just need money to maintain my bot.\nIf you want to support me and my bot(s). I have Paypal and Patreon.

Thanks you for all. Thanks you for use my bot and support me :3 :D

You can pledge money on my Patreon (link below). All the donations are used for System and for improve it. All donation will give something back like the donators role on the System Lounge (More information on the Patreon page).

=======================
[Patreon](https://www.patreon.com/Shigehiro_)
[Paypal](https://www.paypal.me/Shigehiro)
[Support server invite](${client.settings.support})
=======================`,
      color: 0xFFFFFF
    }
  });
  message.channel.send(':white_check_mark: I have sent my donation information to you through Direct Messages.');

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 1
};

exports.help = {
  name: `donate`,
  description: `Get my donation information.`,
  usage: `${client.settings.prefix}donate`
};
