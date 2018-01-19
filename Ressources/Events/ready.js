var colog = require('colog');

const chalk = require('chalk');
module.exports = client => {
  if (client.shard.id === 0) {
    client.website = require('../../system-web.js');
  }



  colog.log(colog.color(`Launched shard [${client.options.shardId+1}/${client.options.shardCount}] > `, `yellow`));
  saveStats();

  function saveStats() {
    system.post.datadog();
    system.updateGuild();
    setTimeout(() => {
      saveStats();
    }, 30000);
  };
}
