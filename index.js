// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;
const fs = require('node:fs');
const path = require('node:path');
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
for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const commands = require(filePath);
    if('data' in commands && 'execute' in commands){
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
    if(!interaction.isChatInputCommand()){
        return;
    } else {
        const command = interaction.client.commands.get(interaction.commandName);
        if(!command){
            console.error('comando não encontrado!')
        } else {
            await command.execute(interaction)
        }
    }
});