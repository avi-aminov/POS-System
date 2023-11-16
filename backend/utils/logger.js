const colors = require('colors');

function logger(status, message) {
	let styledMessage;

	if (status === 500) {
		styledMessage = message.red;
	} else if (status === 401 || status === 404) {
		styledMessage = message.yellow;
	} else {
		styledMessage = message.green;
	}

	console.log(`Status: ${status}, Message: ${styledMessage}`);
}

module.exports = logger;
