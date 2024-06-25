const jwt = require('jsonwebtoken');

async function checkIfTokenIsValid(token) {
    if (!token) {
        throw new Error('Token inválido');
    }
    const jwtSecret = process.env.JWT_SECRET;
    const validToken = jwt.verify(token, jwtSecret);
    const userId = validToken.id_user;
    const userName = validToken.user_name;
    return { userId, userName }
}

module.exports = { checkIfTokenIsValid }