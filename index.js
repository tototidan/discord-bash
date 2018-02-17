#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const discord =require('discord.js');
const client = new discord.Client();
client.login('NDEyOTI1OTU1ODIxMTQyMDE2.DWSa9w.dpviWpXVk0p6aDH3qidUkcgC0MU');
client.on("ready",() =>
{
    console.log("salut mec ")
     client.syncGuilds();
     var ser = []
    client.guilds.forEach(function(data)
    {      
        ser.push(data)      
    });

    ser.forEach(function(data)
    {
        data.channels.forEach(function(test){
            console.log(test.name ,"  ", test.id)
            test.
            if(test.name == "general")
            {
                test.send("salut")
            }
        });
    });
})
client.on("message",message =>{
	if(message.content === "salut")
	{
		console.log("salut mec2");
		message.reply('pong')
	}
})



//Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('-w, --world', 'Show hello world')
    .option('-i, --input', 'Show hello world')

//On parse les arguments
//fonction synchrone
// program.parse(process.argv);

// if(program.world){
    // console.log("Hello world");
// }
// else if(program.input){
    // inquirer.prompt([
        // {
            // type: 'input',
            // message: 'Entrer votre nom d\'utilisateur',
            // name: 'username'
        // },{
            // type: 'password',
            // message: 'Entrer votre mot de passe',
            // name: 'password'
        // },{
            // type: 'checkbox',
            // message: 'Que voulez-vous sauvegarder ?',
            // name: 'folderToSave',
            // choices:[
                // 'Documents',
                // 'Bureau',
                // 'Musique'
            // ]
        // }
    // ]).then((answer)=> {
        // console.log(answer);
    // })
// }
// else{
    // program.help();
// }