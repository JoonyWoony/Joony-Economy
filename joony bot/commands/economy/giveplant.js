let Discord = require('discord.js')
const plants = require('../../imported values/plants')
const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: process.env.dbhost,
    user: process.env.dbuser,
    port: 3306,
    password: process.env.dbpass,
    database: process.env.db,
});

module.exports = {
    name: "giveplant",
    category: "economy",
    description: "Rolling plants",
    cooldown: '10',
    /**
   * @param {Discord.Message} message
   * @param {Array} args
   */
    async execute(message, args) {
        let xd = message.mentions.members.first()
        let plant = await GetPlant(message.author.id)
        if (!xd) return message.reply(`ā You haven't provided a user! Mention a user next time.`)
        if (plant) {
            let name = plants[plant]['name']
            let embed = new Discord.MessageEmbed()
            .setAuthor({name: `${message.author.username}'s Transaction š³ | AWAITING`})
            .setDescription(`ā Plant Transaction is awaiting.\nā  If ${xd} already has a plant, it will be replaced ā `)
            .addField('Trade Status',`${xd} has to react to this message with ā to CONFIRM\nEXPIRES in 10 Seconds`)
            .addField('Trading',`${name}`)
            .setFooter({ text: `${xd.user.username}, react with ā to confirm the trade`})
            .setColor('RED')
            message.channel.send({embeds: [embed]}).then(msg => {
                msg.react('ā')
                const filter = (reaction, user) => {
                    return reaction.emoji.name === 'ā' && user.id === xd.id;
                }
                const collector = msg.createReactionCollector({
                    filter, 
                    max: 1,
                    time: 10000,
                })
                collector.on('collect', async(reaction) => {
                    let embed = new Discord.MessageEmbed()
                    .setAuthor({name: `${message.author.username}'s Transaction š³ | CONFIRMED`})
                    .setDescription(`${xd}, ${message.author.username} gave you ${name}! You are now the owner of ${name}!`)
                    .addField('Trade Status',`CONFIRMED ā`)
                    .addField('Trading',`${name}`)
                    .setColor('GREEN')
                    message.channel.send({embeds: [embed]})
                    AddPlant(xd.id, plant)
                    AddPlant(message.author.id, 'banana')
                    message.author.send('Since you gave your plant away, you have been given a default plant.\nYou have received: **š BANANA**')
                })
            })
        } else {
            message.channel.send({content: `ā Seems like you don't own a plant. do \`.plant\` to get one!`})
        }
    }
}

async function GetPlant(id) {
    let data = await(await connection).query(`SELECT * FROM Plants WHERE UserID = "${id}"`)

    return data[0][0] ? data[0][0]["Plant"] : undefined
} 

async function AddPlant(id, plant) {
    let lol = await GetPlant(id)
    if (lol === undefined) {
        (await connection).query(`INSERT INTO Plants (UserID, Plant) VALUES ("${id}", "${plant}")`)
    } else {
        (await connection).query(`UPDATE Plants SET Plant="${plant}" WHERE UserID="${id}"`)
    }
    return true;
}