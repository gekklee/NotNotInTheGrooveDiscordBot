const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()											//gives the slash command it's properties
		.setName('queue')
		.setDescription(`See what Grooves we got playin'`),


	async execute(interaction) {
		const queue = distube.getQueue(interaction);
		if (!queue) {
			await interaction.reply(`There aren't any Grooves right now!`);
		} else {
			await interaction.reply(
				`Current queue:\n${queue.songs
					.map(
						(song, id) =>
							`**${id ? id : 'Playing'}**. ${song.name
							} - \`${song.formattedDuration}\``,
					)
					.slice(0, 10)
					.join('\n')}`,
			);
		}
	},

};