const { Client, Intents } = require('discord.js');
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

var stream = fs.createWriteStream("database.csv", {flags:'a'});

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

class Message {
    constructor(m) {
        this.datenice = new Date(Date.now()).toString()
        this.date = Date.now()
        this.content = m.content
    }

    format() {
        return this.date.toString()+","+this.datenice + "," + this.content.replace(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,'<LINK>').replaceAll(",","<COMMA>").replace(/\n/g,"<NEWLINE>") + "\n"
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

client.on('messageCreate', (message) => {
    stream.write(new Message(message).format())
})

client.on('ready', () => {
    console.log("Ready")
})


client.login(process.env.TOKEN)
