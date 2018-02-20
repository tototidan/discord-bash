const myClient = require('./MyClient').myClient;
const inquirer = require('inquirer');

function sendMessage() {
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

        let promiseSend = [];
        for(let chan of answer.selectedChannels){
            promiseSend.push(chan.send(answer.message));
        }

        Promise.all(promiseSend).then(()=>{
            console.log('Messages sent !');
            process.exit();
        });
    });
}



module.exports.sendMessage = sendMessage;