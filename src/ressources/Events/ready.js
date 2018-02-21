module.exports = client => {
	system.log("Shard started", "info");

	saveStats();
	function saveStats() {
		system.post.datadog();
		system.updateGuild();
		setTimeout(() => {
			saveStats();
		}, 30000);
	}

	rotateGames(client, 0);
	function rotateGames(i) {
		client.shard.fetchClientValues("guilds.size").then(results => {
			let games = [`⚔️ Need Help ? ${client.settings.prefix}help`, ` Dev by ${client.settings.author}`, `I'm in ${results.reduce((prev, val) => prev + val, 0)} servers`];
			if(i >= games.length) i = 0;
			client.user.setPresence({
				status: "online",
				game: {
					name: games[i],
					type: 0
				}
			});
		});

		setTimeout(() => {
			rotateGames(client, ++i);
		}, 10000);
	}
};
