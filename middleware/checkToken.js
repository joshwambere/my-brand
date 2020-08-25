const jwt = require('jsonwebtoken');

module.exports = checkToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({
            status: 401,
            error: 'token not provided'
        })
    }
    try {
        const data = jwt.verify(authorization, 'johnson');
        req.tokenData = data;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: error.message
        })
    }
}
