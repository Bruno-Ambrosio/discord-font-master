// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, PermissionsBitField } = require('discord.js');
const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;
const fs = require('node:fs');
const path = require('node:path');
const trocarfonte = require('./commands/trocarfonte');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
    ],
});
client.commands = new Collection();
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commands = require(filePath);
    if ('data' in commands && 'execute' in commands) {
        client.commands.set(commands.data.name, commands)
    } else {
        console.log(`${filePath}: data ou execute ausente!`)
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    } else if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error('comando não encontrado!')
        } else {
            await command.execute(interaction)
        }
    } else {
        interaction.reply('Você não é um administrador!')
    }
});

client.on(Events.GuildMemberAdd, async member => {
    const lastOption = './lastOption.json';
    const servidores = require(lastOption);
    const number = servidores[member.guild.id];
    console.log(await member.user.tag);
    
    try {
        const fakeInteraction = {
            guild: member.guild,
            options: {
                getInteger: () => number
            },
            reply: async (message) => {
                console.log(message);
            }
        };

        await trocarfonte.execute(fakeInteraction);
    } catch (error) {
        console.error(error);
    }
});


client.on(Events.GuildCreate, guild => {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    const { TOKEN, CLIENT_ID } = process.env;
    const commands = [];

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }
    const rest = new REST({version: '10'}).setToken(TOKEN);
    (async () => {
        try {
            console.log(`Resetando ${commands.length} comandos`);
            const data = await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, guild.id, guild.id),
                { body: commands }
            );
            console.log('comando(s) registrado(s) com sucesso!')
        } catch (er) {
            console.log(er);
        }
    })()
});
