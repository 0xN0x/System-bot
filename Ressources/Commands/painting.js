var Jimp = require("jimp");

exports.run = (client, message, args) => {
  if (message.mentions.users.first() && message.mentions.users.first().avatarURL) { var avatar = message.mentions.users.first().avatarURL }
  else if (message.mentions.users.first()) { var avatar = "/home/shiigehiro/System/Ressources/images/default.png" }
  else if (message.author.avatarURL) { var avatar = message.author.avatarURL }
  else { var avatar = "/home/shiigehiro/System/Ressources/images/default.png" }

  Jimp.read("/home/shiigehiro/System/Ressources/images/600x400white.jpg", function (err, lenna) {
    if (err) throw err;
    Jimp.read(avatar, function (err, image) {
    	image.resize(175, 135)
    	lenna.composite(image, 213, 110);
      Jimp.read("/home/shiigehiro/System/Ressources/images/tableau2.png", function (err, image2) {
      	lenna.composite(image2, 0, 0);
        lenna.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
          message.channel.send({
            file: {
              attachment: buffer,
              name: "image.png"
            }
          });
        });
    	});
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
  name: `painting`,
  description: `Make a painting of you.`,
  usage: `${client.settings.prefix}painting [user]`
};
