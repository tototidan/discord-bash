const inquirer = require('inquirer');
const fs = require('fs')
const discord = require('discord.js');
const client = new discord.Client();

async function sendMessage() {
    let myClient = new MyClient();

    myClient.onReady().then(async() => {
        let channels = myClient.GetTextChannels();

        let choices = [];

        let currentServer = null;
        for(let chan of channels){
            if(chan.guild.id != currentServer){
                currentServer = chan.guild.id;
                choices.push(new inquirer.Separator("Serveur : " + chan.guild.name));
            }

            choices.push({name: chan.name, value: chan});
        }
        
        let answer = await inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Sélectionnez les channels auxquels envoyer le message',
                name: 'selectedChannels',
                choices: choices
            },
            {
                type: 'input',
                message: 'Entrer votre message',
                name: 'message'
            }
        ]);

        for(let chan of answer.selectedChannels){
            console.log(typeof(chan));
            chan.send(answer.message).then(() =>{
                console.log('Message sent !');
            });
        }
        
        process.exit();
    });
}

class MyClient {
    constructor() {
        this.client = new discord.Client();
        this.token = "";

        fs.readFile("properties.properties", "utf8", (err, data) => {
            if (err) throw err
            let list = data.trim().split(":")
            this.token = list[1].trim()

            this.client.login(this.token);
        })
    }

    onReady() {
        return new Promise((resolve, reject) => {
            this.client.on('ready', () => {
                this.client.syncGuilds();
                resolve();
            });
        });
    }

    GetTextChannels() {
        let chanList = [];
        for (let item of this.client.channels) {
            let channel = item[1];
            if (channel.type == "text") {
                chanList.push(channel);
            }
        }
        return chanList;
    }
}

module.exports.sendMessage = sendMessage;