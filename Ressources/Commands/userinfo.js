const statusMap = {
  'online': '<:online:313956277808005120>',
  'streaming': '<:straming:313956277132853248>',
  'idle': '<:away:313956277220802560>',
  'dnd': '<:dnd:313956276893646850>',
  'offline': '<:offline:313956277237710868>'
}
const colorMap = {
  'online': 0x157c13,
  'streaming': 0x7c135a,
  'idle': 0xdfb616,
  'dnd': 0xab2317,
  'offline': 0x000000
};

exports.run = (client, m, args) => {
  function uinfo(channel, user, member) {
    system.send(channel, "", null, {
			embed: {
				author: {name: user.username+'\'s information'},
				fields: [{
					name: 'Username',
					value: user.username,
					inline: true
				}, {
					name: 'Nickname',
					value: member.nickname ? member.nickname : "None",
					inline: true
				},{
					name: 'ID',
					value: user.id,
					inline: true
				},{
					name: 'Discriminator',
					value: '#'+user.discriminator,
					inline: true
				},{
					name: 'Status',
					value: statusMap[user.presence.status],
					inline: true
				},{
					name: 'Playing',
					value: user.presence.game ? user.presence.game.name : "None",
					inline: true
				},{
					name: 'Registered',
					value: new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
					inline: true
				},{
					name: 'Joined',
					value: new Date(member.joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
					inline: true
				}],
        thumbnail: {
          url: `${user.avatarURL ? user.avatarURL : ""}`
        },
				color: colorMap[user.presence.status]
			}
		});
  }

  if (m.mentions.users.first()) return uinfo(m.channel, m.mentions.users.first(), m.guild.member(m.mentions.users.first()))
  else if (args && system.getUser(m, args)) return uinfo(m.channel, system.getUser(m, args).user, system.getUser(m, args))
  else return uinfo(m.channel, m.author, m.member);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uinfo'],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: 'userinfo',
  description: 'User information.',
  usage: `${client.settings.prefix}userinfo [user]`
};
