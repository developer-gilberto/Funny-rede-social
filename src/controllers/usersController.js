const usersModel = require("../models/usersModel");
const jwt = require('jsonwebtoken');

const registerAccountDB = async (req, res) => {
    const { userName, userEmail } = req.body;
    const encryptedPassword = req.encryptedPassword;
    const creationDate = new Date().toLocaleString();
    try {
        const [ results ] = await usersModel.insertUserDB(userName, userEmail, encryptedPassword, creationDate);
        console.log(`> Usuário "${userName}" registrado com sucesso no DB.\n`, results);
        res.status(300).redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const redirectUserHome = (req, res) => {
    return res.status(300).redirect(`/home`);
}

const redirectUserProfile = (req, res) => {
    return res.status(300).redirect('/profile');
}

const loadUserHome = async (req, res) => {
    const token = req.cookies.auth_token;
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const validToken = await jwt.verify(token, jwtSecret);
        const userId = validToken.id_user;
        const [ queryResult ] = await usersModel.getUserById(userId);
        const user = queryResult[0];
        const [ queryResultPubs ] = await usersModel.getPubsByUserId(userId);
        const pubs = queryResultPubs;
        res.render('pages/home', { user, pubs });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const loadUserProfile = async (req, res) => {
    const token = req.cookies.auth_token;
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const validToken = await jwt.verify(token, jwtSecret);
        const userId = validToken.id_user;
        const [ queryResult ] = await usersModel.getUserById(userId);
        const user = queryResult[0];
        const [ queryResultPubs ] = await usersModel.getPubsByUserId(userId);
        const pubs = queryResultPubs;
        return res.status(200).render('pages/profile', { user, pubs });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}
        
const loadCreateAccount = (req, res) => {
    return res.status(200).render("pages/createAccount");
}

module.exports = {
    registerAccountDB,
    redirectUserHome,
    redirectUserProfile,
    loadUserHome,
    loadUserProfile,
    loadCreateAccount,
}