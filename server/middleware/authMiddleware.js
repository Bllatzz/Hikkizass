const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; 
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
};


module.exports = authenticateJWT;