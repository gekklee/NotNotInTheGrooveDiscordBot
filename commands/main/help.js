const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Displays the avalible commands so you can start Groovin'`),
    async execute(interaction) {
        await interaction.reply(
			`**play** - Plays song, playlist or searches for music on youtube. \n**stop** - Stops and clears current queue. \n**leave** - Leave vc \n**skip** - Skips current song. \n**loop** - Turns on Loop. \n**queue** - Displays what's in the queue. \n**seek** - Seeks current song to amount of seconds provided (**MUST BE IN SECONDS**)`
		);
    },

};