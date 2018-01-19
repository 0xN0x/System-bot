var system = module.exports = {};
var fs = require('fs');
var crypto = require('crypto');
var request = require("request");
var winston = require('winston');
var mysql = require('mysql');
var prettyMs = require('pretty-ms');
const Discord = require("discord.js");

system.update = {}
system.post = {}

system.permission = function(permission) {
  var table = {
    "1":["Nothing.", false],
    "2":["NSFW channel.", "NSFW"],
    "3":["Owner only.", "OWNER"],
    "4":["Create instant invite.", "CREATE_INSTANT_INVITE"],
    "5":["Kick members.", "KICK_MEMBERS"],
    "6":["Ban members.","BAN_MEMBERS"],
    "7":["Administrator.", "ADMINISTRATOR"],
    "8":["Manage channels.", "MANAGE_CHANNELS"],
    "9":["Manage guild.", "MANAGE_GUILD"],
    "10":["Add reaction.", "ADD_REACTIONS"],
    "11":["Read messages.", "READ_MESSAGES"],
    "12":["Send messages.", "SEND_MESSAGES"],
    "13":["Send TTS messages.", "SEND_TTS_MESSAGES"],
    "14":["Manage messages.", "MANAGE_MESSAGES"],
    "15":["Embed links.", "EMBED_LINKS"],
    "16":["Attach files.", "ATTACH_FILES"],
    "17":["Read message history.", "READ_MESSAGE_HISTORY"],
    "18":["Mention everyone.", "MENTION_EVERYONE"],
    "19":["Use external emojis.", "EXTERNAL_EMOJIS"],
    "20":["Connect.", "CONNECT"],
    "21":["Speak.", "SPEAK"],
    "22":["Mute members.", "MUTE_MEMBERS"],
    "23":["Deafen members.", "DEAFEN_MEMBERS"],
    "24":["Move members.", "MOVE_MEMBERS"],
    "25":["Use VAD.", "USE_VAD"],
    "26":["Change nickname.", "CHANGE_NICKNAME"],
    "27":["Manage nickanmes.", "MANAGE_NICKNAMES"],
    "28":["Manage roles.", "MANAGE_ROLES_OR_PERMISSIONS"],
    "29":["Manage webhooks.", "MANAGE_WEBHOOKS"],
    "30":["Manage emojis.", "MANAGE_EMOJIS"],
    "31":["system developpers only.", "DEV"],
    "32":["Donators only.", "BETA"]
  }
  return table[permission];
}

system.type = function(type) {
  var table = {
    "1":"Core",
    "2":"Moderative",
    "3":"Social",
    "4":"Fun",
    "5":"Utilities",
    "6":"NSFW"
  }
  return table[type];
}

system.log = function(log) {
  console.log(log);
};

system.warn = function(log) {
  console.error(log);
};

system.send = function(channel, message, file, embed) {
  if (!channel) return system.warn('No channel found!');
  else if (!message && !embed && !file) return system.warn('Try to send a blank message..');
  else {
    if (embed) return channel.send("", embed);
    else if (file) {
      try {
        return channel.sendFile(file, '', message)
      } catch(e) {
        system.warm(e)
      }
    }
    else return channel.send(message);
  }
};

system.shortsend = function(channel, message, time) {
  if (!channel) return system.warn('No channel found!');
  else if (!message) return system.warn('Try to send a blank message..');
  else return channel.send(message).then(msg => msg.delete(time ? time : 5000));
};

system.uptime = function(now, start) {
  var stat = (now)-(start);
  return prettyMs(stat, {secDecimalDigits: 0});
};

system.update.command = function() {
  var commands = [];
  client.commands.array().forEach(function(cmd) {
    if (system.permission(cmd.conf.permLevel)[1] !== "DEV") {
      commands.push({name: `${client.settings.prefix}${cmd.help.name}`, args: cmd.help.usage, help: cmd.help.description, permission: system.permission(cmd.conf.permLevel)[0]});
    }
	});
  return commands;
}

system.update.database = function() {
  client.guilds.forEach(function(element) {
    client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${element.id}"`, function(err, rows, fields) {
      if(!rows[0]) {
        client.mysql.query('INSERT INTO guilds SET ?', {g_id: element.id, prefix: '$$'}, function(err, result) { });
      }
    });
  });
}

system.UpperFirstChar = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

system.findNsfw = function(channel) {
  var end;
  client.mysql.query(`SELECT * FROM guilds WHERE NSFW = "${channel}"`, function(err, rows, fields) {
		if (channel === rows[0].NSFW) {

      return true;
    }
  });
}

system.isNsfw = function(guild, channel) {
  client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${guild}"`, function(err, rows, fields) {
		if (channel === rows[0].NSFW) {
      console.log('true');
      return true;
    }
    else return false;
  });
}

system.getUser = function(message, search) {
  let members = message.guild.members.filter(m => {
    if (m.user.username.toLowerCase().includes(search.toLowerCase())) return true;
    if (m.nickname && m.nickname.toLowerCase().includes(search.toLowerCase())) return true;
    if (m.id == search) return true;
    return false;
  });

  if(members.last()) return members.last();
  return false;
}

system.UUID = function() {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now();
  }
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

system.crypto = function(userpassword, salt) {
  var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
  };
  var passwordData = sha512(userpassword, salt);
  return `Password : ${userpassword}\nPasswordhash : ${passwordData.passwordHash}`;
}

system.findImage = function(folder) {
  if (!folder) return;

  var pics = fs.readdirSync(`/home/shiigehiro/System/Ressources/images/${folder}/`);
 	var rand = Math.floor((Math.random()*(pics.length-1)));
	var ext = pics[rand].split('.')[1];
  return [`/home/shiigehiro/System/Ressources/images/${folder}/${pics[rand]}`, ext];
}

system.updateGuild = function() {
  system.post.carbonitex();
  system.post.discordbot();
  system.post.discordlist();
  system.post.dborg();
}

/* system POST DATA FUNCTION */
  system.post.carbonitex = function() {
    client.shard.fetchClientValues('guilds.size').then(results => {
      request.post({
        'url': 'https://www.carbonitex.net/discord/data/botdata.php',
        'headers': {
          'content-type': 'application/json'
        },
        'json': true,
        body: {
          'key': client.settings.carbonitex,
          'servercount': results.reduce((prev, val) => prev + val, 0),
          'botname': client.user.username,
          'logoid': client.user.avatar,
          'botid': client.user.id,
          'ownername': 'Shigehiro',
          'ownerid': '138338704937713664'
        }
      }, (err) => {
        if (err) system.warn(err);
      });
    });
  }

  system.post.discordlist = function() {
    client.shard.fetchClientValues('guilds.size').then(results => {
      request.post({
        'url': 'https://bots.discordlist.net/api',
        'headers': {
          'content-type': 'application/json'
        },
        'json': true,
        body: {
          'token': client.settings.discordlist,
          'servers': results.reduce((prev, val) => prev + val, 0)
        }
      }, (err) => {
        if (err) system.warn(err);
      });
    });
  }

  system.post.dborg = function() {
    request.post({
      'url': `https://discordbots.org/api/bots/${client.user.id}/stats`,
      'headers': {
        'content-type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzODMzODcwNDkzNzcxMzY2NCIsImlhdCI6MTQ5MzE0ODIxNH0.mu8H15KIfwXvV4X8Wh_2_ssImCiz3i56oQ9uOwSA6dE'
      },
      'json': true,
      body: {
        "server_count": client.guilds.size,
        "shard_id": client.options.shardId,
        "shard_count": client.options.shardCount
      }
    }, (err) => {
      if (err) system.warn(err);
    });
  }

  system.post.discordbot = function() {
    client.shard.fetchClientValues('guilds.size').then(results => {
      request.post({
        'url': `https://bots.discord.pw/api/bots/${client.user.id}/stats`,
        'headers': {
          'content-type': 'application/json',
          'Authorization': client.settings.discordbot
        },
        'json': true,
        body: {
          "server_count": results.reduce((prev, val) => prev + val, 0)
        }
      }, (err) => {
        if (err) system.warn(err);
      });
    });
  }

system.post.datadog = function() {
  client.shard.fetchClientValues('guilds.size').then(guilds => {
    client.shard.fetchClientValues('channels.size').then(channels => {
      client.shard.fetchClientValues('users.size').then(users => {
        client.mysql.query(`SELECT * FROM stats WHERE function = "m_received"`, function(err, rows, fields) {
          client.mysql.query(`SELECT * FROM stats WHERE function = "c_received"`, function(err2, rows2, fields2) {
            client.dd.postSeries({
              "series": [{
                "metric": "wolver.servers",
                "points": [
                  [Date.now()/1000, guilds.reduce((prev, val) => prev + val, 0)]
                ],
                "type": "counter",
                "tags": ["Wolver"]
              },{
                "metric": "wolver.channels",
                "points": [
                  [Date.now()/1000, channels.reduce((prev, val) => prev + val, 0)]
                ],
                "type": "counter",
                "tags": ["Wolver"]
              },{
                "metric": "wolver.users",
                "points": [
                  [Date.now()/1000, users.reduce((prev, val) => prev + val, 0)]
                ],
                "type": "counter",
                "tags": ["Wolver"]
              },{
                "metric": "wolver.messages",
                "points": [
                  [Date.now()/1000, rows[0].var]
                ],
                "type": "counter",
                "tags": ["Wolver"]
              },{
                "metric": "wolver.commands",
                "points": [
                  [Date.now()/1000, rows2[0].var]
                ],
                "type": "counter",
                "tags": ["Wolver"]
              },{
                "metric": "wolver.shardCount",
                "points": [
                  [Date.now()/1000, client.options.shardCount]
                ],
                "type": "counter",
                "tags": ["Wolver"]
              }]
            });
          });
        });
      });
    });
  });
}

system.post.newguild = function(guild) {
  const hook = new Discord.WebhookClient('300273960220622848', 'W1HOD3zRsj_Mn_GJ0M_v3yRiCY3cF6bWAIVPucAGTs69FGVGagWakk6CXWGbJnzz_cf0');

  hook.sendMessage(`:white_check_mark: *${guild.name}* • owner: *${guild.owner.user.username}* • ${guild.members.filter(mb => mb.user.bot === false).size} users for ${guild.members.filter(mb => mb.user.bot === true).size-1} bots`, {
    username: "system",
    avatarURL: client.user.avatarURL/*,
    embed: {
      author: {name: `New guild`},
      description: `*${guild.name}* by *${guild.owner.user.username}*\n\n${guild.members.filter(mb => mb.user.bot === false).size} users for ${guild.members.filter(mb => mb.user.bot === true).size} bots`,
      thumbnail: {
        url: `${guild.iconURL ? guild.iconURL : ""}`
      },
      color: 0x00990D
    }*/
  });
}

system.post.deleteguild = function(guild) {
  const hook = new Discord.WebhookClient('300273960220622848', 'W1HOD3zRsj_Mn_GJ0M_v3yRiCY3cF6bWAIVPucAGTs69FGVGagWakk6CXWGbJnzz_cf0');

  hook.sendMessage(`:no_entry: *${guild.name}* • Owner: *${guild.owner.user.username}* • ${guild.members.filter(mb => mb.user.bot === false).size} users for ${guild.members.filter(mb => mb.user.bot === true).size-1} bots`, {
    username: "system",
    avatarURL: client.user.avatarURL/*,
    embed: {
      author: {name: `Remove guild`},
      description: `*${guild.name}* by *${guild.owner.user.username}*\n\n${guild.members.filter(mb => mb.user.bot === false).size} users for ${guild.members.filter(mb => mb.user.bot === true).size-1} bots`,
      thumbnail: {
        url: `${guild.iconURL ? guild.iconURL : ""}`
      },
      color: 0xCC3333
    }*/
  });
}

system.post.messages = function() {
  client.mysql.query(`SELECT * FROM stats WHERE function = "m_received"`, function(err, rows, fields) {
    client.mysql.query(`UPDATE stats SET var = ${rows[0].var+bot.messages} WHERE function = "m_received"`, function(err2, rows2, fields2) {
      client.messages = 0;
    });
  });
}

system.post.commands = function() {
  bot.connection.query(`SELECT * FROM stats WHERE function = "c_received"`, function(err, rows, fields) {
    bot.connection.query(`UPDATE stats SET var = ${rows[0].var+bot.commands} WHERE function = "c_received"`, function(err2, rows2, fields2) {
      bot.commands = 0;
    });
  });
}
