const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const path = require('path');

const checkEmailInUse = async (req, res, next) => {
    try {
        const { userEmail } = req.body;
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
    try {
        const { userEmail } = req.body;
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
    try {
        const { userPassword } = req.body;
        if (!userPassword) {
            return res.status(401).send(`EMAIL ou SENHA incorretos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
        }
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const checkPassword = async (req, res, next) => {
    try {
        const { userEmail, userPassword } = req.body;
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
    try {
        const { userEmail } = req.body;
        const jwtSecret = process.env.JWT_SECRET;
        const [ user ] = await usersModel.getUserByEmail(userEmail);
        const userId = user[0].id_user;
        const userName = user[0].user_name;
        req.params.userName = userName;
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
    // const idUserDB = await usersModel.getUserByEmail(req.body.userEmail);
    // console.log(idUserDB);
    const token = req.cookies.auth_token;
    if (!token) {
        console.log('TOKEN inválido!');
    }
    try {
        const jwtSecret = process.env.JWT_SECRET;
        const validToken = await jwt.verify(token, jwtSecret);
        const userId = validToken.id_user;
        req.userData = { userId }
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send(`Esta página é restrita. <br>Necessário fazer login.`);
    }
}

const uploadImgPub = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imgPub) {
            if (!req.files) {
                req.files = {}
            }
            req.files.imgPub = {name: null};
            return next();
        }
        req.files.imgPub.mv(path.join(__dirname, '../db/uploads/imgPub', req.files.imgPub.name));
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const registerPubDB = async (req, res, next) => {
    try { // PEGAR USER PELO ID DA URL PARA PASSAR PARA INSERTPUBDB()
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
    validatePassword,
    checkPassword,
    encryptPassword,
    generateToken,
    checkTokenValid,
    uploadImgPub,
    registerPubDB,
 }