const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ver se estou online'),
        async execute(interaction) {
        await interaction.reply('To online!')
    }
};