const discord = require('discord.js')
const fs = require('fs')

class MyClient{
    client = new discord.Client()
    token = "";

    constructor(){
        fs.readFile("properties.properties", "utf8", (err, data) => {
            if (err) throw err
            let list = data.trim().split(":")
            token = list[1].trim()

            client.login(token);
        })
    }
}

const client = new MyClient();
module.exports(client);
