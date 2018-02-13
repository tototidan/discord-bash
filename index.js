#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');

//Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('-w, --world', 'Show hello world')
    .option('-i, --input', 'Show hello world')

//On parse les arguments
//fonction synchrone
program.parse(process.argv);

if(program.world){
    console.log("Hello world");
}
else if(program.input){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Entrer votre nom d\'utilisateur',
            name: 'username'
        },{
            type: 'password',
            message: 'Entrer votre mot de passe',
            name: 'password'
        },{
            type: 'checkbox',
            message: 'Que voulez-vous sauvegarder ?',
            name: 'folderToSave',
            choices:[
                'Documents',
                'Bureau',
                'Musique'
            ]
        }
    ]).then((answer)=> {
        console.log(answer);
    })
}
else{
    program.help();
}