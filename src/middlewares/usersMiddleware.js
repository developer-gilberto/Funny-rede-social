const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const path = require('path');

const checkEmailInUse = async (req, res, next) => {
    const { userEmail } = req.body;
    if (!userEmail) {
        return res.status(400).send(`EMAIL ou SENHA inválido. <br> Verifique os dados e tente novamente.`);
    }
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
    const { userPassword } = req.body;
    if (!userPassword) {
        return res.status(400).send(`EMAIL ou SENHA inválido. <br> Verifique os dados e tente novamente.`);
    }
    try {
        const salt = await bcrypt.genSaltSync(10);
        const encryptedPassword = await bcrypt.hashSync(userPassword, salt);
        req.encryptedPassword = encryptedPassword;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const validateUserEmailAndPassword = (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
        return res.status(401).send(`EMAIL ou SENHA incorretos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
    }
    return next();
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
        const token = jwt.sign({ id_user: userId }, jwtSecret, { expiresIn: 3600 });//30 = 30s / 600 = 10min / 3600 = 1hora / '7d' = 7dias
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000//30000 = 30s em milissegundos / 3600000 = 1h em milissegundos / 86400000 = 1 dia em milissegundos
        });
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const checkTokenValid = async (req, res, next) => {
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

const uploadImgPub = async (req, res, next) => {
    if (!req.files || !req.files.imgPub) {
        if (!req.files) {
            req.files = {}
        }
        req.files.imgPub = {name: null};
        return next();
    }
    try {
        await req.files.imgPub.mv(path.join(__dirname, '../db/uploads/imgPub', req.files.imgPub.name));
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const registerPubDB = async (req, res, next) => {
    let { textPub } = req.body;
    if (!textPub) {
        textPub = null;
    }
    if (!textPub && !req.files.imgPub.name) {
        return next();
    }
    const userName = req.params.userName;
    const imgPubName = req.files.imgPub.name;
    const creationDatePub = new Date().toLocaleString();
    try {
        await usersModel.insertPubDB(userName, textPub, imgPubName, creationDatePub);
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

module.exports =  {
    checkEmailInUse,
    checkAccountExist,
    validateUserEmailAndPassword,
    checkPassword,
    encryptPassword,
    generateToken,
    checkTokenValid,
    uploadImgPub,
    registerPubDB,
 }