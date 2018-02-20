#!/usr/bin/env node

const program = require('commander')
const myFunction = require("./testexport")
const fs = require('fs')
let token = ""
let definitePath = ""



fs.readFile("C:/Users/Asus/Desktop/discord bot/discord-bash/properties.properties","utf8",(err ,data) =>
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
    .option('--withfile [value] ' , "attach file to the message")
    .option('-m --message [value]', 'set message')
    .option('-s --sendmessage', 'send message , need -m and -w like( -w \"servername chan1 chan2, servername2 chan1 chan2').parse(process.argv)

async function startTestCommand()
{
    if (program.sendmessage && program.message != null && program.with != null) {

        
        if(await checkFileExist(program.withfile))
        {
            myFunction.msgToManyChan(program.message , program.with , token , process.cwd() + "\\"+program.withfile)
        }
        else
        {
            myFunction.msgToManyChan(program.message, program.with,  token , null) 
        }
    }
    else if(program.list)
    {
        myFunction.getList(program.message , token)
    }
}

async function checkFileExist(path )
{
    if(path == null)
    {
        return false
    }
    fs.stat(process.cwd() + "\\"+path, (err , result)=>
    {
        if(result)
        {
            return true
        }
        else
        {
            console.log("Le fichier n'existe pas ")
            return false
            process.exit()
        }
    })
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