const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()											//gives the slash command it's properties
        .setName('play')
        .setDescription(`Let's get the Groove on!!!`)
        .addStringOption(option =>
            option.setName('input')
                .setDescription(`The input of the Search Term or link!`)
                .setRequired(true)),



	async execute(interaction) {
		const args = interaction.options.getString('input');		//sets args to whatever is typed as input
		const voiceChannel = interaction.member.voice.channel;		//sets voiceChannel as the channel person in

		if (voiceChannel) {
			await interaction.reply(`Let's start the Groove! ${args} added to queue!`);
			distube.play(voiceChannel, args)
				.catch(err => {																				//if something happends it doesn't fucking crash lmao
					if (err.message === 'This url is not supported') {
						interaction.followUp(`That's old magic you need to type a youtube link lol :3`);
					} else {
						interaction.followUp(err.message);
					}
				});
			
		} else {
			interaction.reply(
				'You must join a voice channel first.',
			);
		}
    },

};