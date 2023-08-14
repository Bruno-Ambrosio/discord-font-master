const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Listar os comandos disponíveis'),
        async execute(interaction) {
        await interaction.reply('/fontes - lista as fontes e respectivos identificadores \n /trocarfonte {numero} - configura o bot para trocar os apelidos para a fonte especificada \n /ping - retorna uma mensagem mostrando que o Bot está Online \n /criador - revela quem me criou \n Observação: Os comandos só podem ser usados por administradores do servidor!')
    }
};