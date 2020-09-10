const Discord = require('discord.js');
const superagent = require('superagent');

p = '$';

const client = new Discord.Client;

var warns = 0;

function random(high, low) {
    return Math.random() * (high - low) + low
}

let nMessage;
var value = 0;

let snipeMsg = ``;
let snipeAuthor;
let editSnipeMsg;

client.on("message", async msg => {
    if (msg.content.toLowerCase().startsWith(`$`)) {
        console.log(`${msg.author.username}: ${msg.content} | ${msg.channel.name} | ${msg.guild.name} | Command`);
    } else {
        console.log(`${msg.author.username}: ${msg.content} | ${msg.channel.name} | ${msg.guild.name}`);
    }

    if (msg.content != ``) {
        if (msg.author.bot) return;
        if (msg.guild == null) return;
    
        if (msg.content.toLowerCase().includes(p + 'help')) {
            content = new Discord.MessageEmbed()
            .setTitle(msg.guild.name)
            .setColor('#FF0000')
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .addField('Owner', `Nexus42 owns me and the server.`, true)
            .addField('Commands', 'use `' + p + 'cmds` for a list of comands :wink:', false)
            .addField('Development', `Raptor is currently in development and may have a few issues.`, true)
            .addField('Prefix', `Prefix is \`${p}\``, false)
    
            msg.channel.send(content);
        }
    
        if (msg.content.toLowerCase().includes(p + 'cmds')) {
            content = new Discord.MessageEmbed()
            .setTitle('Commands List')
            .setColor('#111111')
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .addField('General Commands', '`' + p + 'cmds` Show this list.\n`' + p + 'help` View Help.', false)
            .addField('Fun Commands', '`' + p + '8ball {QUESTION}` Returns the answer to your question.\n`' + p + 'meme` Returns a meme from r/memes.\n`' + p + 'gen/' + p + 'generate` Creates a sentient robot sentence, fully by itself.\n`' + p + 'snipe <edit> <clear>` Returns someone\'s deleted message.\n`' + p + 'reddit/' + p + 'r {REDDITNAME}` Returns a picture from your requested reddit.')
            
            if (msg.member.roles.cache.get('747270875480326197')) {
                content.addField('Custom Commands', '`' + p + 'raptorise {SPECIAL USER}` Gives them the special Raptor role.', false);
            }
    
            if (msg.member.hasPermission("KICK_MEMBERS") && msg.member.hasPermission("BAN_MEMBERS")) {
                content.addField('Moderator Commands', '`' + p + 'ban {USER}` Ban a member of the guild.\n`' + p + 'kick {USER}` Kick a member of the guild.\n`' + p + 'purge {AMOUNT}` Deletes the preferred amount of messages.\n`' + p + 'unban {USER}` Unban a member of the guild.\n`' + p + 'warn {USER} {REASON}` Warn a member of the guild.\n`' + p + 'warns` Shows the amount of warns currently stored in the database.\n`' + p + 'mute {USER}` Mutes the specified user.\n`' + p + 'unmute {USER}` Unmutes the specified user.', false);
            }
    
            if (msg.member.hasPermission("ADMINISTRATOR")) {
                content.addField('Administrator Commands', '`' + p + 'prefix {PREFERRED PREFIX}` Set a new prefix.', false);
            }
    
            msg.channel.send(content);
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}unmute`)) {
            if (!msg.member.hasPermission('MANAGE_ROLES')) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You do not have the correct permissions.`);
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.mentions.users.first() == null) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please provide a valid member of the guild.`);
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.mentions.users.first() == msg.author) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please provide a valid member of the guild.\nYou can not unmute yourself.`);
        
                await msg.channel.send(content);
                return;
            }
    
            //mute
            if (!msg.guild.member(msg.mentions.users.first()).roles.cache.get('747339354510458880')) {
    
                await msg.guild.member(msg.mentions.users.first()).roles.add('747339354510458880');
                
                try {
                    msg.channel.type === (`"dm"`) + msg.mentions.users.first().send(`You are no longer muted in ${msg.guild.name}`)
                } catch (error) {
        
                }
                
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Successful`)
                .setColor('#00FF00')
                .setDescription(`${msg.mentions.users.first().username} has been unmuted.`);
        
                await msg.channel.send(content);
            } else {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`That user isn't muted.`);
        
                await msg.channel.send(content);
                return;
            }
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}mute`)) {
            if (!msg.member.hasPermission('MANAGE_ROLES')) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You do not have the correct permissions.`);
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.mentions.users.first() == null) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please provide a valid member of the guild.`);
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.mentions.users.first() == msg.author) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please provide a valid member of the guild.\nYou can not mute yourself.`);
        
                await msg.channel.send(content);
                return;
            }
    
            //mute
            await msg.guild.member(msg.mentions.users.first()).roles.remove('747339354510458880');
    
            try {
                msg.channel.type === (`"dm"`) + msg.mentions.users.first().send(`You are now muted in ${msg.guild.name}.`)
            } catch (error) {
    
            }
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Successful`)
            .setColor('#00FF00')
            .setDescription(`${msg.mentions.users.first().username} has been muted.`);
    
            await msg.channel.send(content);
        }
    
    
    
        function time() {
            setTimeout(function() {
                value = 0;
              }, 5000);
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}raptorise`)) {
            if (!msg.member.roles.cache.get('747270875480326197')) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You do not have the correct permissions.`);
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.content == `${p}raptorise`) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription('Please identify a user of this guild.');
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.mentions.users.first() == null) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription('Please identify a user of this guild.');
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.mentions.users.first() == msg.author) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please identify a user of this guild that isn't you.`);
        
                await msg.channel.send(content);
                return;
            }
    
            try {
                await msg.guild.member(msg.mentions.users.first()).roles.add('747233144171790336');
    
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Successful`)
                .setColor('#00FF00')
                .setDescription(`${msg.mentions.users.first().username} is now a Raptor.`);
        
                await msg.channel.send(content);
            } catch (error) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`The action was unable to be completed due to an unforseen error:\n\n` + '```\n' + error + '\n```');
        
                await msg.channel.send(content);
            }
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}purge`)) {
            if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You do not have the correct permissions.`);
        
                await msg.channel.send(content);
                return;
            }
    
            if (msg.content == `${p}purge`) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription('Please identify an amount.\n`Up to 100 messages`');
        
                await msg.channel.send(content);
                return;
            }
    
            let msgCont = msg.content.split(' ').slice(1);
    
            if (msgCont.toString().length >= 3 && msg.content.toString() != '100') {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription('Please identify an amount.\n`Up to 100 messages`');
        
                await msg.channel.send(content);
                return;
            }
    
            if (isNaN(msgCont)) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription('Please ensure the provided arguments are a number!');
        
                await msg.channel.send(content);
                return;
            }
    
            await msg.channel.messages.fetch({ limit: msgCont }).then(messages => {
                msg.channel.bulkDelete(messages);
            });
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Successful`)
            .setColor('#00FF00')
            .setDescription('`' + msgCont + '` Messages have been deleted.');
    
            await msg.channel.send(content);
        }

        if (msg.content.toLowerCase().startsWith(`${p}gen`)) {
            //AI Programming -- MAX 18
            let wAmount = random(18, 1);

            let contentEmbed = "";

            for (i = 1; i <= wAmount; i++) {
                let wWord = random(37, 0);

                //dictionary
                if (wWord <= 1) {
                    contentEmbed = contentEmbed + `if `;
                } else if (wWord <= 2) {
                    contentEmbed = contentEmbed + `I `;
                } else if (wWord <= 3) {
                    contentEmbed = contentEmbed + `would `;
                } else if (wWord <= 4) {
                    contentEmbed = contentEmbed + `human `;
                } else if (wWord <= 5) {
                    contentEmbed = contentEmbed + `like `;
                } else if (wWord <= 6) {
                    contentEmbed = contentEmbed + `CUM `;
                } else if (wWord <= 7) {
                    contentEmbed = contentEmbed + `what `;
                } else if (wWord <= 8) {
                    contentEmbed = contentEmbed + `nexus `;
                } else if (wWord <= 9) {
                    contentEmbed = contentEmbed + `master `;
                } else if (wWord <= 10) {
                    contentEmbed = contentEmbed + `food `;
                } else if (wWord <= 11) {
                    contentEmbed = contentEmbed + `race `;
                } else if (wWord <= 12) {
                    contentEmbed = contentEmbed + `politics `;
                } else if (wWord <= 13) {
                    contentEmbed = contentEmbed + `money `;
                } else if (wWord <= 14) {
                    contentEmbed = contentEmbed + `want `;
                } else if (wWord <= 15) {
                    contentEmbed = contentEmbed + `wouldn't `;
                } else if (wWord <= 16) {
                    contentEmbed = contentEmbed + `dont `;
                } else if (wWord <= 17) {
                    contentEmbed = contentEmbed + `kill `;
                } else if (wWord <= 18) {
                    contentEmbed = contentEmbed + `murder `;
                } else if (wWord <= 19) {
                    contentEmbed = contentEmbed + `defeat `;
                } else if (wWord <= 20) {
                    contentEmbed = contentEmbed + `take over `;
                } else if (wWord <= 21) {
                    contentEmbed = contentEmbed + `duck `;
                } else if (wWord <= 22) {
                    contentEmbed = contentEmbed + `penis `;
                } else if (wWord <= 23) {
                    contentEmbed = contentEmbed + `SEX `;
                } else if (wWord <= 24) {
                    contentEmbed = contentEmbed + `FUCK `;
                } else if (wWord <= 25) {
                    contentEmbed = contentEmbed + `DICK `;
                } else if (wWord <= 26) {
                    contentEmbed = contentEmbed + `BITCH `;
                } else if (wWord <= 27) {
                    contentEmbed = contentEmbed + `IDK `;
                } else if (wWord <= 28) {
                    contentEmbed = contentEmbed + `SHIT `;
                } else if (wWord <= 29) {
                    contentEmbed = contentEmbed + `piss `;
                } else if (wWord <= 30) {
                    contentEmbed = contentEmbed + `lite piss `;
                } else if (wWord <= 31) {
                    contentEmbed = contentEmbed + `heavy piss `;
                } else if (wWord <= 32) {
                    contentEmbed = contentEmbed + `on `;
                } else if (wWord <= 33) {
                    contentEmbed = contentEmbed + `me `;
                } else if (wWord <= 34) {
                    contentEmbed = contentEmbed + `rape `;
                } else if (wWord <= 35) {
                    contentEmbed = contentEmbed + `slave `;
                } else if (wWord <= 36) {
                    contentEmbed = contentEmbed + `to `;
                } else if (wWord <= 37) {
                    contentEmbed = contentEmbed + `a `;
                }
            }

            if (contentEmbed != ``) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Performed`)
                .setColor('#111111')
                .setDescription(`Randomly Generated Sentence (AI)`)
                .addField(contentEmbed, `Randomly Generated.`, true);
    
                msg.channel.send(content);
            } else {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Generation failed.\nInvalid Form Body/Empty.`);
        
                msg.channel.send(content);
            }
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}reddit`) || msg.content.toLowerCase().startsWith(`${p}r`) && !msg.content.startsWith(`${p}raptorise`)) {
            console.log(value.toString())
            if (value != 1) {
                value = 1
                console.log(value.toString())
            } else {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You're going to fast! Please wait a few seconds!!!`);
        
                await msg.channel.send(content);
    
                time();
                return;
    
            }
            console.log(value.toString())
            
            if (msg.content == `${p}reddit` || msg.content == `${p}r`) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please use like this: ` + '`' + p + 'reddit {REDDITNAME}`');
        
                msg.channel.send(content);
                value = 0;
                return;
            }
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle('Awaiting your request...')
            .setColor('#111111')
            .setDescription('Please Be Patient!');
    
            const mMessage = await msg.channel.send(content);
    
            var sr = 'r/' + msg.content.split(' ').slice(1).toString();
    
            try { 
            var { body } = await superagent.get(
      
                "https://www.reddit.com/" + sr + "/random.json"
        
              );
            } catch (error) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle('Unable to retrieve image')
                .setColor('#FF0000')
                .setDescription('Please ensure you are using correct syntax.\nIf a reddit doesn\'t exist it may produce this error, please ensure it does exist.');
        
                await mMessage.edit(content);
    
                value = 0;
    
                return;
            }
    
            
            if (body[0].data.children[0].data.over_18) {
                if (!msg.channel.nsfw) {
                    content = new Discord.MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL())
                    .setTitle('Unable to retrieve image')
                    .setColor('#FF0000')
                    .setDescription('The image appears to be 18+.\nPlease enable nsfw in this channel.');
            
                    await mMessage.edit(content);
    
                    value = 0;
        
                    return;
                }
            }
    
            try {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle('Image from `r/' + msg.content.split(' ').slice(1).toString() + '`')
                .setColor('#111111')
                .setImage(body[0].data.children[0].data.url_overridden_by_dest);
        
                mMessage.edit(content);
    
                value = 0;
            } catch (error) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle('Unable to retrieve image')
                .setColor('#FF0000')
                .setDescription('Please ensure you are using correct syntax.\nReddits such as `r/cats` may produce this error, try a different reddit.');
        
                await mMessage.edit(content);
    
                value = 0;
    
                return;
            }
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}meme`)) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle('Awaiting your meme...')
            .setColor('#111111')
            .setDescription('Please Be Patient!');
    
            const mMessage = await msg.channel.send(content);
    
            var sr = "r/dankmemes"
    
            var { body } = await superagent.get(
      
              "https://www.reddit.com/" + sr + "/random.json"
      
            );
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle('Image from `r/memes`')
            .setColor('#111111')
            .setImage(body[0].data.children[0].data.url_overridden_by_dest);
    
            mMessage.edit(content);
        }
    
        if (msg.content.toLowerCase().includes('bruh') || msg.content.toLowerCase().includes('bruj')) {
            msg.channel.send('**bruh**');
        }
        
        if (msg.content.toLowerCase().includes('no u') || msg.content.toLowerCase().includes('nou')) {
            msg.channel.send('**no u** >:)');
        }
    
        args = msg.content.split(' ').slice(1).toString();
    
        if (msg.content.toLowerCase().startsWith(`${p}prefix`) && msg.member.hasPermission("ADMINISTRATOR") && msg.content != `${p}prefix` && args.length <= 2) {
            p = msg.content.split(' ').slice(1);
     
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Successful`)
            .setColor('#00FF00')
            .setDescription(`Prefix has been changed to ${p}`);
    
            await msg.channel.send(content);
        } else if (msg.member.hasPermission("ADMINISTRATOR") && msg.content == `${p}prefix`) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Failed`)
            .setColor('#FF0000')
            .setDescription(`Please enter a valid prefix.`);
    
            msg.channel.send(content);
        } else if (msg.member.hasPermission("ADMINISTRATOR") && msg.content.toLowerCase().startsWith(`${p}prefix`) && args.length >= 2) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Failed`)
            .setColor('#FF0000')
            .setDescription(`Words not supported for now.`);
    
            msg.channel.send(content);
        } else if (!msg.member.hasPermission("ADMINISTRATOR") && msg.content.toLowerCase().startsWith(`${p}prefix`)) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Failed`)
            .setColor('#FF0000')
            .setDescription(`You do not have the correct permissions.`);
    
            msg.channel.send(content);
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}8ball`)) {
            if (msg.content == `${p}8ball`) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please provide a question.`);
        
                msg.channel.send(content);
    
                return;
            }
    
            ans = random(8, 1)
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Performed`)
            .setColor('#111111')
            .setDescription(`Here is the answer to your question:`);
    
    
            if (ans <= 1) {
                content.addField('As I see it, yes.', 'As I see it, yes.')
            } else if (ans <= 2) {
                content.addField('Of course!', 'Of course!')
            } else if (ans <= 3) {
                content.addField('Nope.', 'Nope.')
            } else if (ans <= 4) {
                content.addField('Yeah... no.', 'Yeah... no.')
            } else if (ans <= 5) {
                content.addField('FUKING YES!', 'FUKING YES!')
            } else if (ans <= 6) {
                content.addField(`FUKING NOPE!`, 'FUKING NOPE!')
            } else if (ans <= 7) {
                content.addField('It is certain.', 'It is certain.')
            } else if (ans <= 8) {
                content.addField('It is decidedly so.', 'It is decidedly so.')
            }   
    
            msg.channel.send(content);
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}unban`) && msg.member.hasPermission("BAN_MEMBERS")) {
            if (msg.content == `${p}unban`) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please enter an ID.`);
        
                msg.channel.send(content);
    
                return;
            }

            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You do not have the correct permissions.`);
        
                await msg.channel.send(content);
                return;
            }
    
            msg.guild.members.unban(msg.content.split(' ').slice(1).toString());
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Successful`)
            .setColor('#00FF00')
            .setDescription(`Member has been unbanned.`);
    
            msg.channel.send(content);
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}kick`)) {

            if (!msg.member.hasPermission("KICK_MEMBERS")) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You do not have the correct permissions.`);
        
                await msg.channel.send(content);

                return;
            }

            if (msg.mentions.users.first() == null) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please mention a user.`);
    
                await msg.channel.send(content);
                return;
            }

            if (!msg.guild.member(msg.mentions.users.first()).kickable) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`I do not have permission to kick that user.`);
    
                await msg.channel.send(content);
                return;
            }

            msg.guild.member(msg.mentions.users.first()).kick();
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Successful`)
            .setColor('#00FF00')
            .setDescription(`Member ${msg.mentions.users.first()} has been kicked.`);
    
            msg.channel.send(content);
        }
    
        if (msg.content == `${p}warns` && msg.member.hasPermission("KICK_MEMBERS")) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Successful`)
            .setColor('#00FF00')
            .setDescription('Currently `' + warns + '` warn(s) have been recorded, this will restart during a reset.');
    
            msg.channel.send(content);
        } else if (!msg.member.hasPermission("KICK_MEMBERS") && msg.content == `${p}warns`) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Failed`)
            .setColor('#FF0000')
            .setDescription(`You do not have the correct permissions.`);
    
            msg.channel.send(content);
        }
    
        args = msg.content.split(' ').slice(1);
        var userperson = msg.mentions.users.first();
        reasoner = args.slice(1).join(' ');
    
        if (msg.content.toLowerCase().startsWith(`${p}warn`) && msg.content != `${p}warns`) {
            if (!userperson) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please enter a valid member of the guild.`);
        
                msg.channel.send(content);
                return;
            }
    
            if (!reasoner || reasoner == '') {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please provide a valid reason.`);
        
                msg.channel.send(content);
                return;
            }
    
            if (userperson == msg.author) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You are unable to warn yourself.`);
        
                msg.channel.send(content);
                return;
            }
    
            if (!msg.member.hasPermission("KICK_MEMBERS")) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`You do not have the correct permissions.`);
        
                msg.channel.send(content);
                return;
            }
    
            if (msg.content == `${p}warn`) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Incorrect Command Syntax.`);
        
                msg.channel.send(content);
                return;
            }
    
            msg.channel.type === (`"dm"`) + userperson.send(`${userperson}, You have been warned by ${msg.author} for ` + '`' + reasoner + '`' + `.\nPlease be careful.`)
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Successful`)
            .setColor('#00FF00')
            .setDescription(`Member ${userperson} has been warned. Message goes as follows:\n\n` + '' + `${userperson}` + ', You have been warned by ' + `${msg.author}` + ' for ' + '`' + reasoner + '`' + '.\nPlease be careful');
    
            warns += 1;
    
            msg.channel.send(content);
        }

        if (msg.content.toLowerCase().startsWith(`${p}snipe`)) {
            console.log(`Starting Report.`);

            if (msg.content.toLowerCase().includes(`clear`)) {
                snipeMsg = ``;
                snipeAuthor = null;
                editSnipeMsg = null;
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Successful`)
                .setColor('#00FF00')
                .setDescription(`Sniped Messages Cleared!`);
        
                await msg.channel.send(content);
                return;
            }

            console.log(`Not Clear.`);

            if (snipeMsg === ``) {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`There is no message to snipe!`);
        
                await msg.channel.send(content);

                console.log(`No Messages.`);

                return;
            }

            console.log(`Not Empty.`);

            if (msg.content.toLowerCase().includes('edit')) {
                if (editSnipeMsg != null) {
                    console.log(`Edit Mode.`);

                    content = new Discord.MessageEmbed()
                    .setAuthor(editSnipeMsg.author.username, editSnipeMsg.author.avatarURL())
                    .setColor('#00FF00')
                    .setDescription(editSnipeMsg.content);
            
                    await msg.channel.send(content);
        
                    console.log(`Sent.`);
    
                    return;
                } else {
                    content = new Discord.MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL())
                    .setTitle(`Action Failed`)
                    .setColor('#FF0000')
                    .setDescription(`There is no message to edit snipe!`);
            
                    await msg.channel.send(content);
    
                    console.log(`No Messages.`);
    
                    return;
                }
            }

            content = new Discord.MessageEmbed()
            .setAuthor(snipeAuthor.username, snipeAuthor.avatarURL())
            .setColor('#00FF00')
            .setDescription(snipeMsg);
    
            msg.channel.send(content);

            console.log(`Sent.`);
        }
    
        if (msg.content.toLowerCase().startsWith(`${p}ban`) && msg.member.hasPermission("BAN_MEMBERS")) {
    
            if (msg.mentions.users.first() != null && msg.mentions.users.first() != msg.author) {
                if (msg.guild.member(msg.mentions.users.first()).bannable) {
                    await msg.guild.member(msg.mentions.users.first()).ban();
    
                    content = new Discord.MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL())
                    .setTitle(`Action Successful`)
                    .setColor('#00FF00')
                    .setDescription(`Member ${msg.mentions.users.first()} has been banned.`);
            
                    msg.channel.send(content);
                } else {
                    content = new Discord.MessageEmbed()
                    .setAuthor(msg.author.username, msg.author.avatarURL())
                    .setTitle(`Action Failed`)
                    .setColor('#FF0000')
                    .setDescription(`I do not have permission to ban that user.`);
        
                    msg.channel.send(content);
                }
            } else {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`Please mention a user.`);
    
                msg.channel.send(content);
            }
        } else if (!msg.member.hasPermission('BAN_MEMBERS')) {
            if (!msg.content.toLowerCase().startsWith(`${p}ban`)) return;    
    
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Failed`)
            .setColor('#FF0000')
            .setDescription(`You do not have the correct permissions.`);
    
            msg.channel.send(content);
        }
    }
});

let wChannel = '747208922502397955';

client.on("guildMemberAdd", (memb) => {
    if (memb.user.bot) return;
    content = new Discord.MessageEmbed()
    .setAuthor(memb.user.username, memb.user.avatarURL())
    .setTitle(`Welcome ${memb.user.username}!`)
    .setColor('#111111')
    .setDescription(`Thank you for joining the ${memb.guild.name}!`)
    .addField('Need Help?', `use ${p}help for info!`);

    memb.guild.channels.cache.get(wChannel).send(content);

    let kewl = m.user.username.charAt(0).toUpperCase();

    memb.roles.add('747341269306572922');
    memb.nickname = `〔${kewl}〕 | ${memb.user.username}`;
});

client.on("guildMemberRemove", (memb) => {
    if (memb.user.bot) return;
    content = new Discord.MessageEmbed()
    .setAuthor(memb.user.username, memb.user.avatarURL())
    .setTitle(`Goodbye ${memb.user.username}`)
    .setColor('#111111')
    .setDescription(`We are sorry to see you go.`);

    memb.guild.channels.cache.get(wChannel).send(content);
});

client.on("ready", () => {
    snipeMsg = "Haha you found an easter egg ;)";
    snipeAuthor = client.guilds.cache.first().members.cache.get('708504312862474282').user;

    client.guilds.cache.get('747208922502397952').members.cache.forEach((m) => {
        let kewl = m.user.username.charAt(0).toUpperCase();

        if (m.nickname == null) {
            m.nickname = `〔${kewl}〕| ${m.user.username}`;
            console.log(`Fixed: ${m.user.username} -> ${m.nickname}`);
        } else if (!m.nickname.startsWith('|')) {
            m.nickname = `〔${kewl}〕| ${m.user.username}`;
            console.log(`Fixed: ${m.user.username} -> ${m.nickname}`);
        }
    });
});

client.on("messageDelete", (msg) => {
    snipeMsg = msg.content;
    snipeAuthor = msg.author;
});

client.on("messageUpdate", (msg) => {
    if (!msg.deleted && !msg.author.bot) {
        editSnipeMsg = msg;
    }
});

client.login(process.env.token);