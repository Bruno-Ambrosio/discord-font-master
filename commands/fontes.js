const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fontes')
        .setDescription('Lista as fontes disponíveis'),
        async execute(interaction) {
        await interaction.reply('Fontes disponíveis:\n 1 - Math Serif Bold \n 2 - Math Sans Bold')
    }
};