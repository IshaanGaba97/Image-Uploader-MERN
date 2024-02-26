
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;