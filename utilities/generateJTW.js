const jwt = require('jsonwebtoken');

module.exports = function (user) {
    const payload = {
        user: user.id,
        name: user.name,
        email: user.email,
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h',
    });
};