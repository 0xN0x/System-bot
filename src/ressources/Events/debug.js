module.exports = (info) => {
	if(info.startsWith("Authenticated using token")) return false;

	system.log(info, "debug");
	return true;
};
