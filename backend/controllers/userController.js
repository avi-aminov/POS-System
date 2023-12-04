const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const answer = require('../utils/answer');
const User = require('../models/mongoose/userModel');

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	const hashPass = bcrypt.hashSync(password, 8);

	try {
		// Check if a user with the same email already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return answer(400, 'User with the same email already exists!', res);
		}

		// If no existing user is found, create a new user
		const newUser = await User.create({
			name,
			email,
			password: hashPass,
			verified: true,
		});

		return answer(200, 'User created successfully', res);
	} catch (error) {
		return answer(500, `Unable to create a user: ${error.toString()}`, res);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// need add verified = true
		const existingUser = await User.findOne({ email, verified: true });

		if (!existingUser) {
			return answer(401, 'User Not Exist', res);
		}

		const passwordMatch = bcrypt.compareSync(password, existingUser.password);

		if (!passwordMatch) {
			return answer(401, 'Some Parameter is wrong', res);
		}

		const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
		const token = jwt.sign({ sub: existingUser._id, exp }, process.env.SECRET);

		res.cookie('Authorization', token, {
			expires: new Date(exp),
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
		});

		return answer(200, 'login successfully', res);
	} catch (e) {
		return answer(500, `login error: ${e.toString()}`, res);
	}
};


const logout = async (req, res) => {
	try {
		res.clearCookie('Authorization');
		answer(200, 'logout successfully', res);
	} catch (e) {
		answer(500, `logout successfully: ${toString(e)}`);
	}
};

const checkAuth = async (req, res) => {
	try {
		answer(200, 'checkAuth successfully', res);
	} catch (e) {
		answer(400, `checkAuth failed: ${toString(e)}`);
	}
};

module.exports = {
	signup,
	login,
	logout,
	checkAuth,
};
