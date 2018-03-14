console.log("\x1Bc");

const settings = require(`${__dirname}/src/core/settings.json`);

const Sharder = require('eris-sharder').Master;
const sharder = new Sharder(settings.token, `/system-client.js`, {
	stats: true,
	debug: true,
	guildsPerShard: 2200
});
