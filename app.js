const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');					//imports discord.js
const { clientId, guildId, token } = require('./config.json');			//grabs token and shit from file

const client = new Client({														//makes it work with discords fucking shit intents
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	],
});

const fs = require('fs')														//adds fs for loading in slash commands!!
const path = require('node:path');
const config = require('./config.json')											//allows me to grab from config
const { DisTube } = require('distube');											//imports distube
const { YtDlpPlugin } = require('@distube/ytdl-core');							//ytdl player
const VoiceState = require('discord.js/src/structures/VoiceState');				//imports voice state

client.once('ready', () => {													//ready output
	console.log('NotInTheGroove Ready');

});

const distube = new DisTube(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false,
});

global.distube = distube;

client.commands = new Collection();												//Loads in slash commands within folders!!
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);