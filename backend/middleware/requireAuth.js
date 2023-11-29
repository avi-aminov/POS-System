const jwt = require('jsonwebtoken');
const User = require('../models/User');
const answer = require('../utils/answer');

const requireAuth = async (req, res, next) => {
	try {
		const token = req.cookies.Authorization;

		if (token) {
			const decoded = jwt.verify(token, process.env.SECRET);

			const user = await User.findOne({
				where: { id: decoded.sub },
			});

			if (!user) {
				return answer(401, 'User Not Exist', res);
			}

			req.user = user;
			next();
		} else {
			return answer(401, 'Token Empty', res);
		}
	} catch (e) {
		return answer(401, `requireAuth error ${this.toString(e)}`);
	}
};

module.exports = requireAuth;
