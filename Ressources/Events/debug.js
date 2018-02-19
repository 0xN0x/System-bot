module.exports = (info) => {
  if (info.startsWith('Authenticated using token')) return;
  
  system.log(info, "debug");
}