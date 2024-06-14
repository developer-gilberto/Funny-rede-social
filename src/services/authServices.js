const usersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    const { userEmail } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const [ user ] = await usersModel.getUserByEmail(userEmail);
        const userId = user[0].id_user;
        const token = jwt.sign(
            {id_user: userId},
            jwtSecret,
            {expiresIn: 3600} // 1 hora
            //{expiresIn: 30} // 30s
            //{expiresIn: 600} // 10min
            //{expiresIn: '1d'} // 1dia
        );
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000 // 1h
            //maxAge: 30000 // 30s
            //maxAge: 86400000 // 1dia
        });
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const authorizeUser = async (req, res, next) => {
    const token = req.cookies && req.cookies.auth_token ? req.cookies.auth_token : null;
    if (!token) {
        console.log('TOKEN inválido!\nPara acessar, é necessário fazer Login');
    }
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const validToken = await jwt.verify(token, jwtSecret);
        const userId = validToken.id_user;
        req.userData = { userId }
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send(`Esta página é restrita. <br>Para acessar, é necessário fazer <a href="/">Login</a>.`);
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}