#!/usr/bin/env node

const program = require('commander')
const theFunction = require("./function")
const path = require("path")
const fs = require("fs")

program
	.version('1.0.0')
	.option('-l --list [value]', "List all server and chan , optional parameter \"server\" to search only in this server case insensitive")
	.option('-w, --with <items>', 'Show hello world')
	.option('-m --message [value]', 'set message')
	.option('-s --sendmessage', 'send message , need -m and -w like( -w \"servername chan1 chan2, servername2 chan1 chan2')
	.option('-p --prompt', 'show prompt to send message')
	.option('-f --file [value]', 'attach file to the message (use with -p or -s)')
	.parse(process.argv)

startTestCommand();
async function startTestCommand() {
	if (program.sendmessage && program.message != null && program.with != null) {
		theFunction.msgToManyChan(program.message, program.with, program.file)
	}
	else if (program.list) {
		theFunction.getList(program.with)
	}
	else if (program.prompt) {
		theFunction.sendMessage(program.file)
	}
	else {
		program.help();
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

