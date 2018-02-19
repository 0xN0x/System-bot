const fs = require("fs");
exports.run = (client, message, args) => {
	let types = {
		"1": "Core",
		"2": "Moderative",
		"3": "Social",
		"4": "Fun",
		"5": "Utilities",
		"6": "NSFW"
	}
	let core = [];
	let moderative = [];
	let social = [];
	let fun = [];
	let utilities = [];
	let nsfw = [];
  if (!args) {
    for (var i=0; i<client.commands.array().length; i++) {
      if (system.permission(client.commands.array()[i].conf.permLevel)[1] !== "DEV") {
        let type = client.commands.array()[i].conf.type;
        let name = client.commands.array()[i].help.name;
	      if (type === 1) core.push(name);
	      else if (type === 2) moderative.push(name);
	      else if (type === 3) social.push(name);
	      else if (type === 4) fun.push(name);
	      else if (type === 5) utilities.push(name);
	      else if (type === 6) nsfw.push(name);
				  else return;
			  }
   		}
	  	message.author.send({
		    embed: {
		      fields: [
						{name: 'Core:', value: core.join(", "), inline: false},
						{name: 'Moderative:', value: moderative.join(", "), inline: false},
						//{name: 'Social:', value: social.join(", "), inline: false},
						{name: 'Fun:', value: fun.join(", "), inline: false},
						{name: 'Utilities:', value: utilities.join(", "), inline: false},
						{name: 'NSFW:', value: nsfw.join(", "), inline: false},
						{name: '-------', value: `[Patreon](https://www.patreon.com/Shiigehiro)\n[Website](${client.settings.website})\n[Commands](${client.settings.website}/commands.html)\n[Invite](${client.settings.invite})\n[Support](${client.settings.support})`, inline: false}
					],
					footer: {text: `Do ${client.settings.prefix}help <command> for command usage.`},
		      color: 0xFEFCF9
		    }
		  });
			message.channel.send('All commands have been sent, look in your DM.');
		} else if (args) {
		  if (!client.commands.find(val => val.help.name === args)) return;

		  let info = client.commands.find(val => val.help.name === args);
		  message.channel.send({
		    embed: {
		      author:{name: `Command: ${types[info.conf.type]} > ${info.help.name}`},
		      fields:[{
		        name: 'Description',
		        value: info.help.description
		      },{
		        name: 'Usage',
		        value: info.help.usage
		      }]
		    }
		  });
		}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 1
};

exports.help = {
  name: 'help',
  description: 'Show the commands list.',
  usage: `${client.settings.prefix}help [command]`
};
