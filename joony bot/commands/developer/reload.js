module.exports = {
    name: 'reload',
    category: 'developer',
    aliases: ['r', 'rel'],
    async execute(message, args) {
      const commandName = args[0].toLowerCase();
      const command =
        message.client.commands.get(commandName) ||
        message.client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
  
      if (!command) {
        return message.channel.send(
          `There is no command with name or alias \`${commandName}\`, ${message.author}!`
        );
      }
      
      delete require.cache[require.resolve(__dirname.replace('\\', '/').replace('\\misc', '') + `/${command.category}/${command.name}.js`)];
      
      try {
        const newCommand = require(__dirname.replace('\\', '/').replace('\\misc', '') + `/${command.category}/${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
        message.channel.send(`Command \`${command.name}\` was reloaded!`);
      } catch (error) {
        console.error(error);
        message.channel.send(
          `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
        );
      }
    },
  };