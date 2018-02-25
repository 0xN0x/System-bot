module.exports = async (client) => {
	system.log("Shard started", "info");


	setTimeout(() => {
		system.post.datadog();
	}, 30000);

	setInterval(() => {
		system.updateGuild();
		system.log("Stats send to bots list", "debug")
    }, 1800000);

	function rotateGames(i) {
		client.shard.fetchClientValues("guilds.size").then(results => {
			let games = [
				` Need Help ? ${client.settings.prefix}help`,
				` with ${client.settings.author}`,
				` in ${results.reduce((prev, val) => prev + val, 0)} servers`
			];

			if(i >= games.length) i = 0;
			client.user.setPresence({
				status: "dnd",
				game: {
					name: games[i],
					type: "PLAYING"
				}
			});
		});

		setTimeout(() => {
			rotateGames(++i);
		}, 10000);
	}
	rotateGames(0);
};
