const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('criador')
        .setDescription('Diz quem é meu criador'),
        async execute(interaction) {
        await interaction.reply('Meu criador é caffeine77')
    }
};