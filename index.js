const Discord = require('discord.js');
const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//const config = require('./settings.json');
const { loadCommands } = require('./utils/loadCommands');
const DisTube = require('distube')

require('dotenv-flow').config();
const config = {
    token: process.env.TOKEN
}


bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `**Playing** :notes: \`${song.name}\` - \`${song.formattedDuration}\`\n**Requested by** :technologist: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `**Added** :musical_note: \`${song.name}\` - \`${song.formattedDuration}\`\n**To the queue by** :technologist: ${song.user}`
    ))

require('./utils/loadEvents')(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

loadCommands(bot);

bot.login(config.token);
