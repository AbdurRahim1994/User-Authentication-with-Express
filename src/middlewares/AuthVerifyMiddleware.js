const jwt = require("jsonwebtoken");

const AuthVerifyMiddleware = (request, response, next) => {
    const { token } = request.headers;
    jwt.verify(token, 'SecretKey123456789', function (error, decoded) {
        if (error) {
            response.status(401).json({ status: "Unathorized" })
        }
        else {
            const email = decoded.data;
            request.headers.email = email;
            next();
        }
    })
}

module.exports = AuthVerifyMiddleware;