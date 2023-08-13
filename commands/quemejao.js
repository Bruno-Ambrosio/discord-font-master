const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quemejao')
        .setDescription('quem é Joao Vitor Spohn'),
        async execute(interaction) {
        await interaction.reply('João Vitor Spohn é um cara trabalhador, possui uma das motos mais rápidas de palotina, a famigerada R3 300CC. Ele pode ser explosivo as vezes, racista, e homofóbico. Mas no geral ele é gente fina!')
    }
};