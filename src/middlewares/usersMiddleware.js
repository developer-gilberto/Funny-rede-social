const bcrypt = require("bcryptjs");
const usersModel = require('../models/usersModel');
const path = require('path');

const checkIfEmailInUse = async (req, res, next) => {
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

const validateEmailAndPassword = (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
        return res.status(401).send(`EMAIL ou SENHA incorretos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
    }
    return next();
}

const checkIfAccountExist = async (req, res, next) => {
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

const checkIfPasswordTrue = async (req, res, next) => {
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
    checkIfEmailInUse,
    checkIfAccountExist,
    validateEmailAndPassword,
    checkIfPasswordTrue,
    encryptPassword,
    uploadImgPub,
    registerPubDB,
 }