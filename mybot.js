const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var request = require("request");
const league = require("./league.json");
const commands = require("./commands/commands.json");
var https = require('https');

client.login(config.token);

client.on("ready", () => {
	console.log("Demacia!");
});

client.on("message", (message) => {
	if (!message.content.startsWith(config.prefix)) return;
	
	if (message.content.startsWith(config.prefix + "help")) {
		message.channel.send("Here is a list of my commands:")
		message.channel.send("-- !timeout <Discord Username>\n\t\tmoves mentioned user into the " + commands.timeout + " role. *Must be an admin*\n");
		message.channel.send("-- !ga <Discord Username>\n\t\tmoves mentioned user into the " + commands.ga + " role. *Must be an admin*\n")
		message.channel.send("-- !summ <LoL Username>\n\t\tdisplays the username, summoner level, and account id of the specified user.\n")
	}	

	if (message.content.startsWith(config.prefix + "timeout")) {
		if(message.member.hasPermission("ADMINISTRATOR")){
			message.channel.send("DEMACIAAAAAA!!!", {tts: true});
			let role = message.guild.roles.find("name", commands.timeout);
			let member = message.mentions.members.first();
			console.log(member);
			member.setRoles([role]);
		}
	}

	if (message.content.startsWith(config.prefix + "ga")) {
		if(!message.member.hasPermission("ADMINISTRATOR")) return;
		message.channel.send("IN THE KINGS NAME!");
		let role = message.guild.roles.find("name", commands.ga);
		let member = message.mentions.members.first();
		member.setRoles([role]).catch(console.error);
	}

	if (message.content.startsWith(config.prefix + "summ")) {
		var words = message.content.split(' ');
		var summ = words[1];
		var url = league.summIOne + summ + league.key;

		callback = function(response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				var res = JSON.parse(str);
				message.channel.send(res.name + ":\n--Level: " + res.summonerLevel + "\n--AccountID: " + res.accountId);
			});
		}
		https.get(url, callback).end();
	}

	if (message.content.startsWith(config.prefix + "lmatch")){

	}
});
