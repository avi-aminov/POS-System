const jwt = require('jsonwebtoken');
const User = require('../models/mongoose/userModel'); // Assuming you've exported your Mongoose model from userModel.js
const answer = require('../utils/answer');

const requireAuth = async (req, res, next) => {
	try {
		const token = req.cookies.Authorization;

		if (token) {
			const decoded = jwt.verify(token, process.env.SECRET);

			const user = await User.findOne({ _id: decoded.sub });

			if (!user) {
				return answer(401, 'User Not Exist', res);
			}

			req.user = user;
			next();
		} else {
			return answer(401, 'Token Empty', res);
		}
	} catch (e) {
		return answer(401, `requireAuth error ${e.toString()}`, res);
	}
};

module.exports = requireAuth;
