const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()											//gives the slash command it's properties
		.setName('loop')
		.setDescription(`Keeping the Groove going!`),


	async execute(interaction) {
		var output = 1

		try {
			const mode = distube.setRepeatMode(interaction);
			await interaction.reply(
				`Set repeat mode to \`${mode
					? mode === 2
						? 'All Queue'
						: 'This Song'
					: 'Off'
				}\``,
			);
		} catch (NO_QUEUE) {
			output = 2
		}
		if (output === 2) {
			await interaction.reply('No Groove to Loop :(');

		}
	},

};