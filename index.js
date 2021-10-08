/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable indent */
// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents, GuildMember, VoiceState, BaseGuildVoiceChannel } = require('discord.js', '@discordjs/voice');
const { token } = require('./config.json');
const { get } = require('http');
const { TIMEOUT } = require('dns');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  client.user.setActivity('with my weiner');
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		interaction.reply('Pong!');
	}
	else if (commandName === 'server') {
		interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	}
	else if (commandName === 'user') {
		interaction.reply('User info.');
	}
});

client.on('message', message => {
  if (message.content.startsWith('💀')) {
     message.delete(1000); //Supposed to delete message
     message.channel.send('relax');
  }
});

// Login to Discord with your client's token
client.login(token);