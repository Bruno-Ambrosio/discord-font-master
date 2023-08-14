const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('node:fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('trocarfonte')
        .setDescription('Troca a fonte dos apelidos dos membros do servidor')
        .addIntegerOption(option =>
            option.setName('numero')
                .setDescription('Digite o identificador da fonte')
                .setRequired(true)
        ),
    async execute(interaction) {
        const guild = interaction.guild;
        const membros = await guild.members.fetch();
        const respostas = [];
        for (const membro of membros.values()) {
            console.log(membro.nickname);
            var negado;
            if (!membro.permissions.has(PermissionsBitField.Flags.Administrator)) {
                var userNumber = interaction.options.getInteger('numero');
                const lastOptionFile = './lastOption.json';
                fs.writeFileSync(lastOptionFile, JSON.stringify(userNumber));
                if (userNumber < 0 || userNumber > 3) {
                    respostas.push('Não existe fonte para este input!');
                    negado = 1;
                    return;
                }
                var replacements = {};
                if (userNumber == 1) {
                    replacements = {
                        a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣',
                        k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭',
                        u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
                        A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉',
                        K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓',
                        U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙',
                        '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗', '0': '𝟎'
                    };
                } else if (userNumber == 2) {
                    replacements = {
                        a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷',
                        k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁',
                        u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
                        A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝',
                        K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧',
                        U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
                        '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵', '0': '𝟬'
                    }
                    //O discord não suporta o item 3
                } else if (userNumber == 3) {
                    replacements = {
                        a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿',
                        k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉',
                        u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏',
                        A: '𝒜', B: '𝐵', C: '𝒞', D: '𝒟', E: '𝐸', F: '𝐹', G: '𝒢', H: '𝐻', I: '𝐼', J: '𝒥',
                        K: '𝒦', L: '𝐿', M: '𝑀', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: '𝑅', S: '𝒮', T: '𝒯',
                        U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵',
                        '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦', '5': '𝟧', '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫', '0': '𝟢'
                    };
                };
                try {
                    if (userNumber == 0) {
                        if(membro.nickname){
                        membro.setNickname(null);
                        respostas.push(`Apelido de ${membro.user.tag} removido!`);
                        }
                    } else {
                        if (membro.nickname == null) {
                            if (membro.user.tag.includes('#')) {
                                const listaString = membro.user.tag.split('#');
                                var nomeMembro = listaString[0];
                            } else {
                                var nomeMembro = membro.user.tag;
                            }
                            console.log(nomeMembro);
                            const formattedString = nomeMembro.replace(/[a-zA-Z]/g, char => replacements[char] || char);
                            membro.setNickname(formattedString);
                        } else {
                            const nickMembro = membro.nickname;
                            const formattedString = nickMembro.replace(/[a-zA-Z]/g, char => replacements[char] || char);
                            membro.setNickname(formattedString);
                        }
                    }
                } catch (error) {
                    console.error(`Erro ao trocar apelido para ${membro.user.tag}: ${error}`);
                }
            } else {
                respostas.push(`Não foi possível trocar a fonte de ${membro.user.tag} porque ele é um administrador!`)
            };
        };
        if (negado != 1) {
            respostas.push(`Apelidos alterados com sucesso!`);
        }
        if(interaction){
        await interaction.reply(respostas.join('\n'));
        }
    },
};