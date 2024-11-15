const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()											//gives the slash command it's properties
		.setName('stop')
		.setDescription(`Every Groove gotta' end some day :(`),


	async execute(interaction) {
		var output = 1
		try {								//try catch to make it not crash if queue is empty (applies to all)
			distube.stop(interaction);
		} catch (NO_QUEUE) {
			output = 2
		}
		if (output === 2) {
			await interaction.reply('No Groove to End :(');

		} else {
			await interaction.reply('Stopped the Groove!');
		}
	},

};