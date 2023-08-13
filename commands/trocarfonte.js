const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('trocarfonte')
        .setDescription('Troca a fonte dos apelidos dos membros do servidor'),
    async execute(interaction) {
        const guild = interaction.guild;
        const membros = await guild.members.fetch();
        const respostas = [];
        membros.forEach(async (membro) => {
            console.log(membro.nickname);
            if(!membro.permissions.has(PermissionsBitField.Flags.Administrator)){
                try {
                    const replacements = {
                        a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣',
                        k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭',
                        u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
                        A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉',
                        K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓',
                        U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙'
                    };
                    if (membro.nickname == null) {
                        const nomeMembro = membro.user.tag;
                        const formattedString = nomeMembro.replace(/[a-zA-Z]/g, char => replacements[char] || char);
                        membro.setNickname(formattedString);
                    } else {
                        const nickMembro = membro.nickname;
                        const formattedString = nickMembro.replace(/[a-zA-Z]/g, char => replacements[char] || char);
                        membro.setNickname(formattedString);
                    }
                } catch (error) {
                    console.error(`Erro ao trocar apelido para ${membro.user.tag}: ${error}`);
                }
            } else {
                respostas.push(`Não foi possível trocar a fonte de ${membro.user.tag} porque ele é um administrador!`)
            } 
        }
        );
        respostas.push(`Apelidos formatados com sucesso!`);
        await interaction.reply(respostas.join('\n'));
    },
};