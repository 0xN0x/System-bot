const reqEvent = (event) => require(`../Ressources/Events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
  client.on('guildCreate', reqEvent('guildCreate'));
  client.on('guildDelete', reqEvent('guildDelete'));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
};
