using discord_bot.comandos;
using discord_bot.config;
using DSharpPlus;
using DSharpPlus.CommandsNext;
using DSharpPlus.Entities;
using DSharpPlus.EventArgs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace DiscordFontMaster
{
    internal class Program
    {
        private static DiscordClient Client { get; set; }
        private static CommandsNextExtension Commands { get; set; }
        static async Task Main(string[] args)
        {
            var jsonReader = new JSONReader();
            await jsonReader.ReadJSON();
            var discordConfig = new DiscordConfiguration()
            {
                Intents = DiscordIntents.All,
                Token = jsonReader.token,
                TokenType = TokenType.Bot,
                AutoReconnect = true,
            };
            Client = new DiscordClient(discordConfig);
            Client.Ready += ClientReady;
            Client.GuildMemberAdded += MembroNovo;

            var commandsConfig = new CommandsNextConfiguration()
            {
                StringPrefixes = new String[] { jsonReader.prefix },
                EnableMentionPrefix = true,
                EnableDms = true,
                EnableDefaultHelp = false
            };

            Commands = Client.UseCommandsNext(commandsConfig);

            // Registrar comandos
            Commands.RegisterCommands<Comandos>();

            // Conectar bot
            await Client.ConnectAsync();
            await Task.Delay(-1);
        }


        private static async Task MembroNovo(DiscordClient client, GuildMemberAddEventArgs evento)
        {
            string path = "./Options.json";
            Dictionary<ulong, string> dicionario;
            if (File.Exists(path))
            {
                Comandos comandos = new Comandos();
                string json = File.ReadAllText(path);
                dicionario = JsonConvert.DeserializeObject<Dictionary<ulong, string>>(json);
                int parametro = int.Parse(dicionario[evento.Guild.Id]);
                var usuario = evento.Member;
                string nome = "";
                string nomeFormatado = "";

                try
                {
                    if (usuario.Nickname != null)
                    {
                        nome = usuario.Nickname;
                    }
                    else
                    {
                        string[] prenome = usuario.Username.Split('#');
                        nome = prenome[0];
                    }
                    if (parametro == 1)
                    {
                        nomeFormatado = nome
            .Replace("A", "𝗔").Replace("B", "𝗕").Replace("C", "𝗖").Replace("D", "𝗗").Replace("E", "𝗘")
            .Replace("F", "𝗙").Replace("G", "𝗚").Replace("H", "𝗛").Replace("I", "𝗜").Replace("J", "𝗝")
            .Replace("K", "𝗞").Replace("L", "𝗟").Replace("M", "𝗠").Replace("N", "𝗡").Replace("O", "𝗢")
            .Replace("P", "𝗣").Replace("Q", "𝗤").Replace("R", "𝗥").Replace("S", "𝗦").Replace("T", "𝗧")
            .Replace("U", "𝗨").Replace("V", "𝗩").Replace("W", "𝗪").Replace("X", "𝗫").Replace("Y", "𝗬")
            .Replace("Z", "𝗭")
            .Replace("a", "𝗮").Replace("b", "𝗯").Replace("c", "𝗰").Replace("d", "𝗱").Replace("e", "𝗲")
            .Replace("f", "𝗳").Replace("g", "𝗴").Replace("h", "𝗵").Replace("i", "𝗶").Replace("j", "𝗷")
            .Replace("k", "𝗸").Replace("l", "𝗹").Replace("m", "𝗺").Replace("n", "𝗻").Replace("o", "𝗼")
            .Replace("p", "𝗽").Replace("q", "𝗾").Replace("r", "𝗿").Replace("s", "𝘀").Replace("t", "𝘁")
            .Replace("u", "𝘂").Replace("v", "𝘃").Replace("w", "𝘄").Replace("x", "𝘅").Replace("y", "𝘆")
            .Replace("z", "𝘇")
            .Replace("1", "𝟭").Replace("2", "𝟮").Replace("3", "𝟯").Replace("4", "𝟰").Replace("5", "𝟱")
            .Replace("6", "𝟲").Replace("7", "𝟳").Replace("8", "𝟴").Replace("9", "𝟵").Replace("0", "𝟬");
                    }
                    if (parametro == 2)
                    {
                        nomeFormatado = nome
   .Replace("A", "𝐀").Replace("B", "𝐁").Replace("C", "𝐂").Replace("D", "𝐃").Replace("E", "𝐄")
   .Replace("F", "𝐅").Replace("G", "𝐆").Replace("H", "𝐇").Replace("I", "𝐈").Replace("J", "𝐉")
   .Replace("K", "𝐊").Replace("L", "𝐋").Replace("M", "𝐌").Replace("N", "𝐍").Replace("O", "𝐎")
   .Replace("P", "𝐏").Replace("Q", "𝐐").Replace("R", "𝐑").Replace("S", "𝐒").Replace("T", "𝐓")
   .Replace("U", "𝐔").Replace("V", "𝐕").Replace("W", "𝐖").Replace("X", "𝐗").Replace("Y", "𝐘")
   .Replace("Z", "𝐙")
   .Replace("a", "𝐚").Replace("b", "𝐛").Replace("c", "𝐜").Replace("d", "𝐝").Replace("e", "𝐞")
   .Replace("f", "𝐟").Replace("g", "𝐠").Replace("h", "𝐡").Replace("i", "𝐢").Replace("j", "𝐣")
   .Replace("k", "𝐤").Replace("l", "𝐥").Replace("m", "𝐦").Replace("n", "𝐧").Replace("o", "𝐨")
   .Replace("p", "𝐩").Replace("q", "𝐪").Replace("r", "𝐫").Replace("s", "𝐬").Replace("t", "𝐭")
   .Replace("u", "𝐮").Replace("v", "𝐯").Replace("w", "𝐰").Replace("x", "𝐱").Replace("y", "𝐲")
   .Replace("z", "𝐳")
   .Replace("1", "𝟭").Replace("2", "𝟮").Replace("3", "𝟯").Replace("4", "𝟰").Replace("5", "𝟱")
   .Replace("6", "𝟲").Replace("7", "𝟳").Replace("8", "𝟴").Replace("9", "𝟵").Replace("0", "𝟬");

                    }


                    if (parametro == 0)
                    {
                        nomeFormatado = "";
                    }

                    _ = usuario.ModifyAsync(properties =>
                    {
                        properties.Nickname = nomeFormatado;
                    });
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }

            }
        }
        private static Task ClientReady(DiscordClient client, DSharpPlus.EventArgs.ReadyEventArgs args)
        {
            return Task.CompletedTask;
        }
    }
}
