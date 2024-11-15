const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()											//gives the slash command it's properties
		.setName('seek')
		.setDescription(`Skippin' to the Grooviest part!`)
		.addStringOption(option =>
			option.setName('input')
				.setDescription(`The input of the timestamp in SECONDS!!`)
				.setRequired(true)),


	async execute(interaction) {
		const args = interaction.options.getString('input')
		const queue = distube.getQueue(interaction);

		if (!queue) {
			return await interaction.reply(`There aren't any Grooves right now!`);
		}
		if (isNaN(args) || args < 0) {
			return await interaction.reply(`Stop trying to break me plz!!!!! D:`)
		}
		else {
			distube.seek(queue, Number(args))
			await interaction.reply(`Skipped to ${args}`)
		}
	},

};