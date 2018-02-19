const unirest = require('unirest');

const rightpad = (v, n, c = '0') => String(v).length >= n ? '' + v : String(v) + String(c).repeat(n - String(v).length);
const leftpad = (v, n, c = '0') => String(v).length >= n ? '' + v : (String(c).repeat(n) + v).slice(-n);

exports.run = (client, message, args) => {
  unirest.get('https://www.carbonitex.net/discord/api/listedbots')
  .end(res => {
    let chunks = [];
    let bots = res.body.sort((a, b) => b.servercount - a.servercount);
    bots = bots.filter(b => (b.servercount !== '0' && b.botid > 15));
    bots = bots.map(b => {
      b.name = b.name.replace(/[^a-z0-9]/gmi, "").replace(/\s+/g, "");
      return b;
    });
    while (bots.length > 0) chunks.push(bots.splice(0, 15));
    let page = Math.min(Math.max(parseInt(args)), chunks.length) || 1;
    message.channel.send(`Page ${page}/${chunks.length}\n` + chunks[page-1].map((b, i) => `[${leftpad(((page-1)*15)+(i+1), 2)}] [${rightpad(b.name+']', 25, ' ')}${b.servercount} Servers`).join('\n'), {code: "xl"});
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
  name: `botlist`,
  description: `Carbonitex botlist.`,
  usage: `${client.settings.prefix}botlist [page]`
};
