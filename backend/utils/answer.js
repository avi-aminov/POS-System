const logger = require('./logger');

function answer(status, message, res = null, data = null) {
	logger(status, message);
	if (res) {
		if (data) {
			return res.status(status).json({ message, data });
		}
		return res.status(status).json({ message });
	}
}

module.exports = answer;
