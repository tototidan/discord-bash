var exports = module.exports = {}
const discord = require('discord.js')
const client = new discord.Client()
const _ = require("lodash")
const inquirer = require('inquirer')
exports.msgToManyChan = function(msg, withCommand , token , path) 
{
        let file = createAttachementObject(path)

        client.login(token)
        client.on("ready", () => {
            client.syncGuilds()

            let end = false
            let splittedUserInput = withCommand.split(",")
            let chanToSend = []
            let error = []

            splittedUserInput.forEach(function(dataFromUser) { // iterate though the input of the user , we split it with the split(",") if all is ok splittedUserInput[0] is the name of the server
                let compteur = 0 // if this var stay to 0 , there is no server who match with the name of the server in the user input 
                let actualServ = dataFromUser.trim().split(" ")

                client.guilds.forEach(function(data) {
                    
                    if (checkServerExist(data.name , actualServ[0])) { 
                        compteur++  // server exist

                        for (let i = 1 ; i < actualServ.length ; i++) { // foreach chan passed in user input we check if he exist with the .find function

                            let de = data.channels.find(function(channelObject) {

                                return channelObject.name === actualServ[i]
                            })

                            if (de != null) // if the chan exist we push it on the list of the chan where to send the message , else we create a new error and push it in error array
                                {
                                    chanToSend.push(de)
                                } 
                            else 
                                {
                                    error.push(new ErrorNameChan(data.name, actualServ[i]))
                                }
                        }
                    }

                })
                if (compteur == 0) {
                    error.push(new ErrorNameServer(actualServ[0]))
                }

            })
            
            askUser().then(() => { // too lazy to change the prompt to co-prompt so we cheat a little , but its ok i got it !

            }).catch((err)=>{console.log(err)})


            async function askUser() {
                chanToSend = _.uniq(chanToSend)

                let textPrompt = ""
                if (error.length == 0) 
                    {
                        textPrompt += "Souhaitez vous envoyer le message sur tout les channels ?  O: oui , N : non"
                    } 
                else 
                    {
                        textPrompt += "Nous avons trouver les erreurs suivantes : \n"
                        error.forEach(function(donn)
                            {
                             textPrompt += donn.toString() + "\n"
                            })
                        textPrompt += "Voulez vous envoyez le message sur channel tout de m�me ? O : Oui , N : Non"
                    }

                inquirer.prompt([{
                    type: "input",
                    message: textPrompt,
                    name: "reponse"
                }]).then((reponse) => {

                    if (reponse.reponse.toLowerCase().search("o") != -1)
                        {
                            let compteur = 0

                            chanToSend.forEach(function(c, index, array)
                                {
                                    try
                                    {
                                    c.send(msg , file).then(() =>
                                       {
                                        compteur++
                                        if (compteur === array.length) {
                                            endProcess()
                                        }
                                    })
                                }
                                catch(e){console.log("catch send : " + e) ; process.exit()}
                                })
                        } 
                    else if (reponse.reponse.toLowerCase().search("n") != -1)
                    {
                        endProcess()
                    } 
                    else 
                    {
                        endProcess()
                    }
                }).catch((err)=>{console.log(err)})
            } 

        })

    }


    class ErrorNameServer {
        constructor(name) {
            this.name = name

        }
        toString() {

            return "Nous n'avons pas trouv� le serveur : " + this.name
        }
    }


    class ErrorNameChan extends ErrorNameServer {
        constructor(server, name) {
            super(name)
            this.server = server
        }
        toString() {

            return "Nous n'avons pas trouv� le chan : " + this.name + " sur le serveur : " + this.server
        }
} 


exports.getList = function(server , token)
{
    client.login(token)
    client.on("ready", ()=>
    {
        client.syncGuilds()
        if(server == undefined || server == true) // no server name in user input
        {
            generateList(client.guilds)
        }
        else
        {
            let compteur = 0
            let dummyArray = []
            
            client.guilds.forEach((data)=>
            {   
                {
                    if(checkServerExist(data.name ,server))
                    {
                        compteur++
                        dummyArray.push(data)
                    }
                }
            })
             if(compteur == 0)
                {
                   console.log("Aucun serveur avec le nom : ",server," n'a été trouvé !")
                   endProcess()
                }
             else
                { 
                    generateList(dummyArray)
                }
        
    }


        function generateList(listOfServer)
        {
            
            listOfServer.forEach((data)=>
            {
                console.log("Serveur : ", data.name)
                data.channels.forEach((chan)=>
                {
                    if(chan.type == "text")
                    {
                        console.log("   Nom du channel : " ,chan.name)
                    }
                })
            })
            endProcess()
        }
    })
}



function deleteAccent(pString) 
{
    return pString.replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function checkServerExist(serverObject , serverName)
{
    if(deleteAccent(serverObject) == deleteAccent(serverName))
    {
        return true
    }
    return false

}

function endProcess() 
    {
        process.exit()
    }

function createAttachementObject(path)
{   
    if (path != null || path != undefined)
    {
        return new discord.Attachment(path)
    }
    else
    {
        return null
    }
}