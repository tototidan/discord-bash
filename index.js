#!/usr/bin/env node

const program = require('commander');
const myFunction = require("./testexport")
const fs = require('fs')
let token = ""



fs.readFile("properties.properties","utf8",(err ,data) =>
{
       if(err) throw err
       let list = data.trim().split(":")
       token = list[1].trim()
       startTestCommand()     
    })


program
    .version('1.0.0')
    .option('-l --list [value]' , "List all server and chan , optional parameter \"server\" to search only in this server case insensitive")
    .option('-w, --with <items>', 'Show hello world')
    .option('-i, --input', 'Show hello world')
    .option('-m --message [value]', 'set message')
    .option('-s --sendmessage', 'send message , need -m and -w like( -w \"servername chan1 chan2, servername2 chan1 chan2').parse(process.argv)

function startTestCommand()
{
    if (program.sendmessage && program.message != null && program.with != null) {

        myFunction.msgToManyChan(program.message, program.with,  token) 
    }
    else if(program.list)
    {
        myFunction.getList(program.message , token)
    }
}



//Configuration des paramètres attendus



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