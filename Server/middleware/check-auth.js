const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        // 401: unauthenticated
        console.log(error);
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}