import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]; // token is 1st position after split
		const isCustomAuth = token.length < 500; // >500 means googleAuth

		let decodeData;

		if (token && isCustomAuth) {
			decodeData = jwt.verify(token, 'test');
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		next();
	} catch (err) {
		console.log(err);
	}
};

export default auth;
