var http = require('http')

exports.run = (client, message, args) => {
  message.channel.startTyping();
  var url = 'http://api.yomomma.info';

  http.get(url, function(res){
    var yomama = '';
    res.on('data', function(chunk){
      yomama += chunk;
    });
    res.on('end', function(){
      message.channel.send(JSON.parse(yomama).joke);
      message.channel.stopTyping();
    });
  }).on('error', function(e){
    console.log("Got an error: ", e);
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
  name: `yomama`,
  description: `Yomama joke.`,
  usage: `${client.settings.prefix}yomama`
};
