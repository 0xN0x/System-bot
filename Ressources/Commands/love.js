var querystring = require("querystring");
var curl = require('curlrequest');
var couple = [
  ['138338704937713664', '255459436934594560', 'Forever love'],
  ['138385733114265601', '231521957730844672', 'A neko-love forever'],
  ['221319118769356811', '213708650038951937', 'AHH, GAYYY !!!'],
  ['281570630808371200', '213370674528518146', 'L\'amour des pabo'],
  ['138729016038391808', '215042458906656769', ':cat::black_heart::fox:']
]

exports.run = (client, message, args) => {
  if (!message.mentions.users.first()) return message.channel.send(`You need mention someone`);
  for (var i=0; i<couple.length; i++) {
    if (((message.author.id === couple[i][0] || message.mentions.users.first().id === couple[i][0])
       && (message.author.id === couple[i][1] || message.mentions.users.first().id === couple[i][1]))
       || (message.mentions.users.array()[0] && message.mentions.users.array()[1]) && (message.mentions.users.array()[0].id === couple[i][0] || message.mentions.users.array()[1].id === couple[i][0])
       && (message.mentions.users.array()[0].id === couple[i][1] || message.mentions.users.array()[1].id === couple[i][1])) {
      return message.channel.send({
        embed: {
          author: {
            name: `Love test - ${message.guild.members.get(couple[i][0]).user.username} X ${message.guild.members.get(couple[i][1]).user.username}`
          },
          description: `${couple[i][2]}\n**100** ❤️`,
          color: 0xFF8DA1
        }
      });
    }
  }
  var options = { url: `https://love-calculator.p.mashape.com/getPercentage?fname=${querystring.escape(message.mentions.users.array()[0].username)}&sname=${message.mentions.users.array()[1] ? querystring.escape(message.mentions.users.array()[1].username) : querystring.escape(message.author.username)}`, headers: {'X-Mashape-Key': 'FJUHBBuLP2mshm6QfdjMqLsz3J4Yp1MSZ8LjsnRy2btgDK2MoF', 'Accept': 'application/json'}};
  curl.request(options, function (err, parts) {
    if (err) return console.log(err)
    message.channel.send({
      embed: {
        author: {
          name: `Love test - ${message.mentions.users.array()[0].username} X ${message.mentions.users.array()[1] ? message.mentions.users.array()[1].username : message.author.username}`
        },
        description: `${JSON.parse(parts).result}\n**${JSON.parse(parts).percentage}** ❤️`,
        color: 0xFFFFFF
      }
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 4
};

exports.help = {
  name: `love`,
  description: `Love meter.`,
  usage: `${client.settings.prefix}love <user> [user]`
};
