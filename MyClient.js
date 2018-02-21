
const isNullOrUndefined = require('util').isNullOrUndefined;
const discord = require('discord.js');
const fs = require('fs')

const pathProperties = "properties.properties"

class MyClient {
	constructor() {
		this.client = new discord.Client();
		this.token = "";

		this.getToken().then((token) => {
			this.token = token;
			this.client.login(this.token);
		});
	}

	getToken(){
		return new Promise((resolve, reject) => {
			fs.readFile(pathProperties, "utf8", (err, data) => {
				if (err)
					reject(err);

				let token = null;
				let list = data.trim().split(":")
				token = list[1].trim()

				resolve(token);
			})
		});
		
	}

	static setToken(token){
		return new Promise((resolve, reject) => {
			if(token.length != 59)
				reject('Bad token');

			let data = "token: " + token;
			fs.writeFile(pathProperties, data, "utf8", (err) => {
				if(err)
					reject(err);

				resolve();
			})
		});
	}

	onReady() {
		return new Promise((resolve, reject) => {
			this.client.on('ready', () => {
				this.client.syncGuilds();
				resolve();
			});
		});
	}

	GetTextChannels() {
		let chanList = [];
		for (let item of this.client.channels) {
			let channel = item[1];
			if (channel.type == "text") {
				chanList.push(channel);
			}
		}
		return chanList;
	}

	createAttachement(path) {
		return new Promise((resolve, reject) => {

			if (isNullOrUndefined(path)) {
				resolve(null);
			}
			fs.stat(path, (err, result) => {
				if (result) {
					resolve(new discord.Attachment(path));
				}
				else {
					console.log("Le fichier n'existe pas ")
					resolve(null);
					process.exit()
				}
			})
		});
	}
}

module.exports.MyClient = MyClient;
module.exports.myClient = new MyClient();

