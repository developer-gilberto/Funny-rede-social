const jwt = require('jsonwebtoken');

async function checkIfTokenIsValid(token) {
    if (!token) {
        throw new Error('Token inválido');
    }
    const jwtSecret = process.env.JWT_SECRET;
    const validToken = await jwt.verify(token, jwtSecret);
    const userId = validToken.id_user;
    return userId;
}

module.exports = { checkIfTokenIsValid }