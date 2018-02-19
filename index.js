#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const discord =require('discord.js');
const _ = require("lodash")
var observe = require('observe')
const client = new discord.Client();

program
    .version('1.0.0')
    .option('-w, --with <items>', 'Show hello world')
    .option('-i, --input', 'Show hello world')
    .option('-m --message' , 'set message')
    .option('-s --sendmessage','send message , need -m and -w like( -w \"servername chan1 chan2, servername2 chan1 chan2').parse(process.argv)

if(program.sendmessage && program.message != null && program.with != null)
{
    msgToManyChan(program.message , program.with)
}
msgToManyChan("salut all , ça marche")
function msgToManyChan(msg , withCommand )
{
    
    client.login('NDEyOTI1OTU1ODIxMTQyMDE2.DWSa9w.dpviWpXVk0p6aDH3qidUkcgC0MU');
    client.on("ready",() =>
    {
        var end = false
        var observer = observe(end)
        observer.on("change",function(data)
        {
            if(data == true)
            {
                return true;
            }
        })
        client.syncGuilds();
        var splittedUserInput = withCommand.split(",")
        var chanToSend = []
        var error = []
        splittedUserInput.forEach(function(dataFromUser)
        {
            var compteur = 0
            var actualServ = dataFromUser.trim().split(" ")
            client.guilds.forEach(function(data)
            {      
                
                if(deleteAccent(data.name) == deleteAccent(actualServ[0]) )
                {
                    compteur++
                    for(var i = 1; i < actualServ.length; i++)
                    {
                        
                        var de = data.channels.find(function(channelObject)
                        { 
                            
                            return channelObject.name === actualServ[i]
                        })  
                        if(de != null)
                        {
                            chanToSend.push(de);
                        }    
                        else
                        {
                           error.push(new ErrorNameChan(data.name , actualServ[i])) 
                        }
                    }
                }  
                    
            });
            if(compteur == 0)
            {
                error.push(new ErrorNameServer(actualServ[0]))
            }
             
        })
       
        chanToSend = _.uniq(chanToSend)

        var textPrompt = ""
        if(error.length == 0)
        {
            textPrompt("Souhaitez vous envoyer le message sur tout les channels ? ")
        }
        else
        {
            textPrompt += "Nous avons trouver les erreurs suivantes : \n"
            error.forEach(function(donn)
            {
                textPrompt +=donn.toString()+"\n"
            })
            textPrompt +=  "Voulez vous envoyez le message sur channel tout de même ? O : Oui , N : Non"
        }
        
        inquirer.prompt([{
            type: "input",
            message:  textPrompt,
            name:"reponse"
        }]).then((reponse)=>
            {
                if(reponse.reponse.toLowerCase().search("o") != -1)
                {
                    chanToSend.forEach(function(c)
                    {
                        c.send(msg)
                        
                    })
                    
                }
                else if(reponse.listOfId.toLowerCase().search("n") != -1)
                {
                    return true
                    
                }
                else
                {
                    return true
                   
                }
            })
        
        
        function deleteAccent(pString)
        {
            return pString.replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }
        
    })

}
class ErrorNameServer
{
    constructor( name )
    {
        this.name = name
       
    }
    toString()
    {
        
        return "Nous n'avons pas trouvé le serveur : " + this. name
    }
}
class ErrorNameChan extends ErrorNameServer
{
    constructor(server , name )
    {
        super(name )
        this.server = server
    }
    toString()
    {
        
        return "Nous n'avons pas trouvé le chan : " + this.name + " sur le serveur : "+ this.server
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