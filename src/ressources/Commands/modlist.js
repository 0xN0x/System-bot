const isStaff = (m) => {
    let permissions = m.permissions.serialize();
    return (permissions.KICK_MEMBERS
        || permissions.BAN_MEMBERS
        || permissions.ADMINISTRATOR
        || permissions.MANAGE_CHANNELS
        || permissions.MANAGE_GUILD
        || permissions.MANAGE_MESSAGES);
};

const statusMap = {
  'online': '<:online:313956277808005120>',
  'streaming': '<:straming:313956277132853248>',
  'idle': '<:away:313956277220802560>',
  'dnd': '<:dnd:313956276893646850>',
  'offline': '<:offline:313956277237710868>'
}

const sortMap = { 'online': 1, 'idle': 2, 'streaming': 3, 'dnd': 4, 'offline': 5 };

const getStatus = (m, map = true) => {
  let status = m.guild.presences.get(m.user.id) ? m.guild.presences.get(m.user.id).status : 'offline';
  return (map ? statusMap[status] : status);
}

exports.run = (client, message, args) => {
  let mods = message.guild.members.array().filter(m => isStaff(m) && !m.user.bot).sort((a, b) => sortMap[getStatus(a, false)] > sortMap[getStatus(b, false)]);
  mods = mods.map(m => `${getStatus(m)} **${m.user.username}#${m.user.discriminator}**`)
  message.channel.send([`Moderators for **${message.guild.name}** :\n`].concat(mods));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1,
  type: 5
};

exports.help = {
  name: `modlist`,
  description: `List all servers moderators and their status.`,
  usage: `${client.settings.prefix}modlist`
};
