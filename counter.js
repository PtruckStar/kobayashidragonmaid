const fetch = require("node-fetch");
const url = "https://www.freevisitorcounters.com/en/counter/render/906359/t/9"

async function counter(req, res, next) {
  try {
  	await fetch(url);
  	return next();
  } catch (error) {
  	console.log(error);
  	return next();
  }
}

module.exports = counter