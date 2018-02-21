module.exports = (guild) => {
	client.mysql.query(`SELECT * FROM guilds WHERE g_id = "${guild.id}"`, (err, rows) => {
		if(err) return system.log(err, "error");

		if(rows[0]) client.mysql.query(`DELETE FROM guilds WHERE g_id = "${guild.id}"`);
		return true;
	});
	system.updateGuild();
	system.post.deleteguild(guild);

	system.log(`Remove guild : ${guild.name} (${guild.id})`, "info");
};
