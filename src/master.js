const superagent = require("superagent");
const config = require(`${process.cwd()}/src/core/settings.json`);
//const bot = require('./core/bot.js');

Object.defineProperty(cluster, "onlineWorkers", {
	get: () => Object.keys(cluster.workers)
		.map(id => cluster.workers[id])
		.filter(work => work.isConnected())
});

async function init() {
	console.log('master')
	const { body: { shards: totalShards } } = await superagent.get("https://discordapp.com/api/gateway/bot")
		.set("Authorization", config.token);
	process.totalShards = totalShards;

	let shardsPerWorker, fields = [];

	const CoreNum = require("os").cpus().length;
	if(CoreNum >= totalShards) shardsPerWorker = 1;
	else shardsPerWorker = Math.ceil(totalShards / CoreNum);

	const workerCount = Math.ceil(totalShards / shardsPerWorker);
	for(let i = 0; i < workerCount; i++) {
		let shardStart = i * shardsPerWorker, shardEnd = ((i + 1) * shardsPerWorker) - 1;
		if(shardEnd > totalShards - 1) shardEnd = totalShards - 1;
		let shardRange = shardStart === shardEnd ? `shard ${shardStart}` : `shards ${shardStart}-${shardEnd}`;

		const worker = cluster.fork();
		Object.assign(worker, { type: "bot", shardStart, shardEnd, shardRange, totalShards });
		//bot(worker);
	}
}

init();