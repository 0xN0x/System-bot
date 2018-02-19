var weather = require('weather-js');

exports.run = (client, message, args) => {
  weather.find({search: args, degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
    //console.log(JSON.stringify(result, null, 2));
    if (!result) return message.channel.send(`This city doesn't exist.`)
    if (!result[0]) return message.channel.send(`This city doesn't exist.`)
    message.channel.send({
      embed: {
        thumbnail: {
  				url: result[0].current.imageUrl
  			},
        title: ` - Currently - `,
        description: `Location : ${result[0].location.name}\nTemperature : ${result[0].current.temperature}°C\nHumidity : ${result[0].current.humidity}%\nWindspeed : ${result[0].current.windspeed}`,
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
  type: 5
};

exports.help = {
  name: `weather`,
  description: `Get the weather of a city.`,
  usage: `${client.settings.prefix}weather <city name>`
};
