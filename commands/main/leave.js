const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()											//gives the slash command it's properties
		.setName('leave')
		.setDescription(`Stopping the Groove :(`),


	async execute(interaction) {
		distube.voices.get(interaction)?.leave();
		await interaction.reply('Left the Groove');
	},

};