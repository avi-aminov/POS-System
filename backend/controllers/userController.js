const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const answer = require('../utils/answer');

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	const hashPass = bcrypt.hashSync(password, 8);

	try {
		// Check if a user with the same userId already exists
		const existingUser = await Users.findOne({
			where: { email },
		});

		if (existingUser) {
			answer(400, 'User with the same userId already exists!', res);
		}

		// If no existing user is found, create a new user
		const newUser = await Users.create({
			name,
			email,
			password: hashPass,
			verified: true,
		});
		answer(200, 'User created successfully', res);
	} catch (error) {
		answer(500, `Unable to create a user: ${toString(error)}`);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// need add verified = 1
		const existingUser = await Users.findOne({
			where: { email, verified: 1 },
		});

		if (!existingUser) {
			answer(401, 'User Not Exist', res);
		}

		const passwordMatch = bcrypt.compareSync(
			password,
			existingUser.password,
		);

		if (!passwordMatch) {
			answer(401, 'Some Parameter is wrong', res);
		}

		const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
		const token = jwt.sign(
			{ sub: existingUser.id, exp },
			process.env.SECRET,
		);

		answer(200, token);

		res.cookie('Authorization', token, {
			expires: new Date(exp),
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
		});

		answer(200, 'login successfully', res);
	} catch (e) {
		answer(500, `logout successfully: ${toString(e)}`);
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
