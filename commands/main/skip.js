const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()											//gives the slash command it's properties
		.setName('skip')
		.setDescription(`Skippin' to a Groovier future!!`),


	async execute(interaction) {
		const queue = distube.getQueue(interaction);
		if (!queue) {
			return await interaction.reply(`There aren't any Grooves right now!`);
		}
		if (queue.autoplay || queue.songs.length > 1) {
			distube.skip(interaction)
			await interaction.reply(`Skipped the current song :3`)
		}
		else {
			await interaction.reply(`Ain't no way bro there's nothin left to Groove to :'(`)
			distube.stop(interaction)
		}
	},

};