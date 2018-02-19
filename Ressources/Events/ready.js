var colog = require('colog');

const chalk = require('chalk');
module.exports = client => {
  system.log('Shard started', 'info');
  saveStats();

  function saveStats() {
    system.post.datadog();
    system.updateGuild();
    setTimeout(() => {
      saveStats();
    }, 30000);
  };
}
