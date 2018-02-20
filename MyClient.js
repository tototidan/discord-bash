const discord = require('discord.js');
const fs = require('fs')

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

module.exports.myClient = new MyClient();