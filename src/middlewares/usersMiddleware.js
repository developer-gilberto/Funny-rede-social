const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const checkEmailInUse = async (req, res, next) => {
    const { userEmail } = req.body;
    try {
        const queryResult = await usersModel.searchEmailDB(userEmail);
        if (queryResult.length > 0) {
            return res.status(409).send(`O email <strong>"${userEmail}"</strong> já está em uso.<br>Por favor tente um email diferente.`);
        }
        return next();  
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const encryptPassword = async (req, res, next) => {
    try {
        const { userPassword } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hashSync(userPassword, salt);
        req.encryptedPassword = encryptedPassword;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const checkAccountExist = async (req, res, next) => {
    const { userEmail } = req.body;
    try {
        const queryResult = await usersModel.searchEmailDB(userEmail);
        if (queryResult.length > 0) {
            return next();
        }
        return res.status(401).send(`EMAIL ou SENHA incorretos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const validatePassword = async (req, res, next) => {
    const { userPassword } = req.body;
    if (!userPassword) {
        return res.status(401).send('Senha inválida. Acesso negado :(');
    }
    return next();
}

const checkPassword = async (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    try {
        const encryptedPasswordDB = await usersModel.searchPasswordDB(userEmail);
        const ifPasswordTrue = await bcrypt.compare(userPassword, encryptedPasswordDB);
        if (ifPasswordTrue) {
            return next();
        }
        return res.status(401).send(`EMAIL ou SENHA incorretos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const generateToken = async (req, res, next) => {
    const { userEmail } = req.body;
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const [ user ] = await usersModel.getUserByEmail(userEmail);
        const userId = user[0].id_user;
        const token = jwt.sign({ id_user: userId }, jwtSecret, { expiresIn: '1d' });//30 = 30s / 600 = 10min / '7d' = 7dias
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 86400000//30000 = 30s em milissegundos / 3600000 = 1h em milissegundos / 86400000 = 1 dia em milissegundos
        });
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const checkTokenValid = async (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        console.log('TOKEN inválido!');
    }
    try {
        const jwtSecret = process.env.JWT_SECRET;
        const trueToken = await jwt.verify(token, jwtSecret);
        const userId = trueToken.id_user;
        req.userData = { userId }
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send(`Esta página é restrita. <br>Necessário fazer login.`);
    }
}

module.exports =  {
    checkEmailInUse,
    checkAccountExist,
    validatePassword,
    checkPassword,
    encryptPassword,
    generateToken,
    checkTokenValid,
 }