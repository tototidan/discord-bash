
const isNullOrUndefined = require('util').isNullOrUndefined;
const discord = require('discord.js');
const fs = require('fs')

class MyClient {
	constructor() {
		this.client = new discord.Client();
		this.token = "";

		fs.readFile("properties.properties", "utf8", (err, data) => {
			if (err) throw err
			let list = data.trim().split(":")
			this.token = list[1].trim()
			this.client.login(this.token);
		})
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

module.exports.myClient = new MyClient();

