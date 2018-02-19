var exports = module.exports = {};
const discord = require('discord.js');
const client = new discord.Client();
const _ = require("lodash")
const inquirer = require('inquirer');
exports.msgToManyChan = function(msg, withCommand , token) 
{
        client.login(token);
        client.on("ready", () => {
            let end = false
            client.syncGuilds();

            let splittedUserInput = withCommand.split(",")
            let chanToSend = []
            let error = []

            splittedUserInput.forEach(function(dataFromUser) {
                let compteur = 0
                let actualServ = dataFromUser.trim().split(" ")

                client.guilds.forEach(function(data) {

                    if (deleteAccent(data.name) == deleteAccent(actualServ[0])) {
                        compteur++
                        for (let i = 1; i < actualServ.length; i++) {

                            let de = data.channels.find(function(channelObject) {

                                return channelObject.name === actualServ[i]
                            })
                            if (de != null) {
                                chanToSend.push(de);
                            } else {
                                error.push(new ErrorNameChan(data.name, actualServ[i]))
                            }
                        }
                    }

                });
                if (compteur == 0) {
                    error.push(new ErrorNameServer(actualServ[0]))
                }

            })
            
            async function askUser() {
                chanToSend = _.uniq(chanToSend)

                let textPrompt = ""
                if (error.length == 0) {
                    textPrompt += "Souhaitez vous envoyer le message sur tout les channels ?  O: oui , N : non"
                } else {
                    textPrompt += "Nous avons trouver les erreurs suivantes : \n"
                    error.forEach(function(donn) {
                        textPrompt += donn.toString() + "\n"
                    })
                    textPrompt += "Voulez vous envoyez le message sur channel tout de m�me ? O : Oui , N : Non"
                }
                inquirer.prompt([{
                    type: "input",
                    message: textPrompt,
                    name: "reponse"
                }]).then((reponse) => {

                    if (reponse.reponse.toLowerCase().search("o") != -1) {
                        let compteur = 0
                        chanToSend.forEach(function(c, index, array) {
                            c.send(msg).then(() => {
                                compteur++
                                if (compteur === array.length) {
                                    endProcess();
                                }
                            })
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
            askUser().then(() => {

            }).catch((err)=>{console.log(err)})

            function endProcess() {

                process.exit()
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
        console.log(server)
        if(server == undefined || server == true)
        {
            generateList(client.guilds)
        }
        else
        {
            client.guilds.forEach((bServer)=>
            {
                if(deleteAccent(bServer.name) == deleteAccent(server))
                {
                    generateList(bServer)
                }
            })
        }


        function generateList(listOfServer)
        {
            listOfServer.forEach((data)=>
            {
                console.log("Serveur : " + data.name)
                data.channels.forEach((chan)=>
                {
                    if(chan.type == "text")
                    {
                        console.log("   Nom du channel : " ,chan.name)
                    }
                })
            })
            process.exit()
        }
    })
}

function deleteAccent(pString) {
    console.log("deleteaccent", pString)
    return pString.replace(/[\u0300-\u036f]/g, "").toLowerCase();
}