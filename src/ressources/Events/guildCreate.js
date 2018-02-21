module.exports = (guild) => {
	client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${guild.id}"`, (err, rows) => {
		if(err) return system.log(err, "error");

		if(!rows[0]) client.mysql.query("INSERT INTO guilds SET ?", { g_id: guild.id, prefix: "$$", levelup: "1" });
		return true;
	});
	system.updateGuild();
	system.post.newguild(guild);

	system.log(`New guild : ${guild.name} (${guild.id})`, "info");
};
