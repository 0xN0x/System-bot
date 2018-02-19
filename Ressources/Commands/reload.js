exports.run = (client, message, args) => {
  let command;
  if (client.commands.has(args)) {
    command = args;
  } else if (client.aliases.has(args)) {
    command = client.aliases.get(args);
  }
  if (!command) {
    return message.channel.send(`I cannot find the command: ${args[0]}`);
  } else {
    message.channel.send(`Reloading: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Successfully reloaded: ${command}`);
            console.log(`Command reloaded: ${command}`)
          })
          .catch(e => {
            m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`r`],
  permLevel: 31,
  type: 5
};

exports.help = {
  name: `reload`,
  description: `Reloads the command file, if it\'s been updated or modified.`,
  usage: `${client.settings.prefix}reload <commandname>`
};
