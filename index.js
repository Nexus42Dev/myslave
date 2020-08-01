const Discord = require('discord.js');
const superagent = require('superagent');

p = '$';

const client = new Discord.Client;

var warns = 2;

function random(high, low) {
    return Math.random() * (high - low) + low
}

let nMessage;

client.on("message", async msg => {
    if (msg.author.bot) return;
    if (msg.guild == null) return;

    if (msg.content == p + 'help') {
        content = new Discord.MessageEmbed()
        .setTitle('Wine Server')
        .setColor('#FF0000')
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .addField('Owner', `<@485539515029782528> is the owner of Wine!`, true)
        .addField('Commands', 'use `' + p + 'cmds` for a list of comands :wink:', false)
        .addField('Developer', `<@708504312862474282> is the Head Developer for Wine! B)`, true)
        .addField('Prefix', `Prefix is \`${p}\``, false)

        msg.channel.send(content);
    }

    if (msg.content == p + 'cmds') {
        content = new Discord.MessageEmbed()
        .setTitle('Wine Commands')
        .setColor('#111111')
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .addField('General Commands', '`' + p + 'cmds` Show this list.\n`' + p + 'help` View Help.', false)
        .addField('Fun Commands', '`' + p + '8ball` Returns the answer to your question.\n`' + p + 'meme` Returns a meme from r/memes.\n`' + p + 'reddit {REDDITNAME}` Returns a picture from your requested reddit.')
        
        if (msg.member.hasPermission("KICK_MEMBERS") && msg.member.hasPermission("BAN_MEMBERS")) {
            content.addField('Moderator Commands', '`' + p + 'ban {USER}` Ban a member of the guild.\n`' + p + 'kick {USER}` Kick a member of the guild.\n`' + p + 'unban {USER}` Unban a member of the guild.\n`' + p + 'warn {USER} {REASON}` Warn a member of the guild.\n`' + p + 'warns` Shows the amount of warns currently stored in the database.', false);
        }

        if (msg.member.hasPermission("ADMINISTRATOR")) {
            content.addField('Administrator Commands', '`' + p + 'prefix {PREFERRED PREFIX}` Set a new prefix.', false);
        }

        msg.channel.send(content);
    }

    if (msg.content.startsWith(`${p}reddit`)) {
        if (msg.content == `${p}reddit`) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Failed`)
            .setColor('#FF0000')
            .setDescription(`Please use like this: ` + '`' + p + 'reddit {REDDITNAME}`');
    
            msg.channel.send(content);

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
        } catch (error) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle('Unable to retrieve image')
            .setColor('#FF0000')
            .setDescription('Please ensure you are using correct syntax.\nReddits such as `r/cats` may produce this error, try a different reddit.');
    
            await mMessage.edit(content);

            return;
        }
    }

    if (msg.content.startsWith(`${p}meme`)) {
        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle('Awaiting your meme...')
        .setColor('#111111')
        .setDescription('Please Be Patient!');

        const mMessage = await msg.channel.send(content);

        var sr = "r/memes"

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

    if (msg.content.startsWith('bruh') || msg.content.startsWith('bruj')) {
        msg.channel.send('**bruh**');
    }
    
    if (msg.content.startsWith('no u') || msg.content.startsWith('nou')) {
        msg.channel.send('**no u** >:)');
    }

    args = msg.content.split(' ').slice(1).toString();

    if (msg.content.startsWith(`${p}prefix`) && msg.member.hasPermission("ADMINISTRATOR") && msg.content != `${p}prefix` && args.length <= 2) {
        p = msg.content.split(' ').slice(1);
 
        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Successful`)
        .setColor('#00FF00')
        .setDescription(`Prefix has been changed to ${p}`);

        msg.channel.send(content);
    } else if (msg.member.hasPermission("ADMINISTRATOR") && msg.content == `${p}prefix`) {
        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Failed`)
        .setColor('#FF0000')
        .setDescription(`Please enter a valid prefix.`);

        msg.channel.send(content);
    } else if (msg.member.hasPermission("ADMINISTRATOR") && msg.content.startsWith(`${p}prefix`) && args.length >= 2) {
        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Failed`)
        .setColor('#FF0000')
        .setDescription(`Words not supported for now.`);

        msg.channel.send(content);
    } else if (!msg.member.hasPermission("ADMINISTRATOR") && msg.content.startsWith(`${p}prefix`)) {
        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Failed`)
        .setColor('#FF0000')
        .setDescription(`You do not have the correct permissions.`);

        msg.channel.send(content);
    }

    if (msg.content.startsWith(`${p}8ball`)) {
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
            content.addField('As I see it, yes.', 'Roll again?')
        } else if (ans <= 2) {
            content.addField('Ask again later.', 'Roll again?')
        } else if (ans <= 3) {
            content.addField('Better not tell you now.', 'Roll again?')
        } else if (ans <= 4) {
            content.addField('Cannot predict now.', 'Roll again?')
        } else if (ans <= 5) {
            content.addField('Concentrate and ask again.', 'Roll again?')
        } else if (ans <= 6) {
            content.addField(`Don't count on it.`, 'Roll again?')
        } else if (ans <= 7) {
            content.addField('It is certain.', 'Roll again?')
        } else if (ans <= 8) {
            content.addField('It is decidedly so.', 'Roll again?')
        }   

        msg.channel.send(content);
    }

    if (msg.content.startsWith(`${p}unban`) && msg.member.hasPermission("BAN_MEMBERS")) {
        if (msg.content == `${p}unban`) {
            content = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(`Action Failed`)
            .setColor('#FF0000')
            .setDescription(`Please enter an ID.`);
    
            msg.channel.send(content);

            return;
        }

        msg.guild.members.unban(msg.content.split(' ').slice(1).toString());

        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Successful`)
        .setColor('#00FF00')
        .setDescription(`Member has been unbanned.`);

        msg.channel.send(content);
    } else if (!msg.member.hasPermission('BAN_MEMBERS')) {
        if (!msg.content.startsWith(`${p}unban`)) return;

        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Failed`)
        .setColor('#FF0000')
        .setDescription(`You do not have the correct permissions.`);

        msg.channel.send(content);
    }

    if (msg.content.startsWith(`${p}kick`) && msg.member.hasPermission("KICK_MEMBERS")) {

        if (msg.mentions.users.first() != null && msg.mentions.users.first() != msg.author) {

            if (msg.guild.member(msg.mentions.users.first()).kickable()) {
                msg.guild.member(msg.mentions.users.first()).kick();

                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Successful`)
                .setColor('#00FF00')
                .setDescription(`Member ${msg.mentions.users.first()} has been kicked.`);
        
                msg.channel.send(content);
            } else {
                content = new Discord.MessageEmbed()
                .setAuthor(msg.author.username, msg.author.avatarURL())
                .setTitle(`Action Failed`)
                .setColor('#FF0000')
                .setDescription(`I do not have permission to kick that user.`);
    
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
    } else if (!msg.member.hasPermission('KICK_MEMBERS')) {
        if (!msg.content.startsWith(`${p}kick`)) return;    

        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Failed`)
        .setColor('#FF0000')
        .setDescription(`You do not have the correct permissions.`);

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

    if (msg.content.startsWith(`${p}warn`) && msg.content != `${p}warns`) {
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

    if (msg.content.startsWith(`${p}ban`) && msg.member.hasPermission("BAN_MEMBERS")) {

        if (msg.mentions.users.first() != null && msg.mentions.users.first() != msg.author) {
            msg.guild.member(msg.mentions.users.first()).ban();

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
            .setDescription(`Please mention a user.`);

            msg.channel.send(content);
        }
    } else if (!msg.member.hasPermission('BAN_MEMBERS')) {
        if (!msg.content.startsWith(`${p}ban`)) return;    

        content = new Discord.MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle(`Action Failed`)
        .setColor('#FF0000')
        .setDescription(`You do not have the correct permissions.`);

        msg.channel.send(content);
    }
});

client.on("guildMemberAdd", (memb) => {
    if (memb.user.bot) return;
    content = new Discord.MessageEmbed()
    .setAuthor(memb.user.username, memb.user.avatarURL())
    .setTitle(`Welcome ${memb.user.username}!`)
    .setColor('#111111')
    .setDescription(`Thank you for joining the Official Wine Server!`)
    .addField('Need Help?', `use ${p}help for info!`);

    memb.guild.channels.cache.get(`710973676803063822`).send(content);
});

client.on("guildMemberRemove", (memb) => {
    if (memb.user.bot) return;
    content = new Discord.MessageEmbed()
    .setAuthor(memb.user.username, memb.user.avatarURL())
    .setTitle(`Goodbye ${memb.user.username}`)
    .setColor('#111111')
    .setDescription(`We are sorry to see you go.`);

    memb.guild.channels.cache.get(`710973676803063822`).send(content);
});

client.login(process.env.token);