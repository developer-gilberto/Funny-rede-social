const bcrypt = require("bcryptjs");
const usersModel = require('../models/usersModel');
const authServices = require('../services/checkIfTokenIsValid');
const path = require('path');

const checkIfEmailInUse = async (req, res, next) => {
    const { userEmail, checkBoxCreateAccount } = req.body;
    
    if (!checkBoxCreateAccount) {
        return res.render('pages/notAcceptTermsFunny');
    }
    if (!userEmail) {
        return res.status(400).send(`EMAIL ou SENHA inválido. <br> Verifique os dados e tente novamente.`);
    }
    try {
        const queryResult = await usersModel.searchEmailDB(userEmail);
        if (queryResult.length > 0) {
            // return res.status(409).send(`O email <strong>"${userEmail}"</strong> já está em uso.<br>Por favor tente um email diferente.`);
            return res.status(401).render('pages/emailUsed', { userEmail });
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
        return res.status(401).render('pages/fucked');
        // return res.status(401).send(`EMAIL ou SENHA inválidos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
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
        // return res.status(401).send(`EMAIL ou SENHA incorretos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
        return res.status(401).render('pages/fucked');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const checkIfPasswordTrue = async (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    try {
        const encryptedPasswordDB = await usersModel.getPasswordDB(userEmail);
        const ifPasswordTrue = await bcrypt.compare(userPassword, encryptedPasswordDB);
        if (ifPasswordTrue) {
            return next();
        }
        // return res.status(401).send(`EMAIL ou SENHA incorretos.<br>Acesso negado :( <br> Verifique os dados e tente novamente.`);
        return res.status(401).render('pages/fucked');
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
    const imgPubName = req.files.imgPub.name;
    const creationDatePub = new Date().toLocaleString();
    const token = req.cookies.auth_token;
    try {
        const { userId, userName } = await authServices.checkIfTokenIsValid(token);
        await usersModel.insertPubDB(userId, userName, textPub, imgPubName, creationDatePub);
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const uploadProfilePic = async (req, res, next) => {
    if (!req.files || !req.files.profilePic) {
        if (!req.files) {
            req.files = {}
        }
        req.files.profilePic = {name: null};
        return next();
    }
    try {
        await req.files.profilePic.mv(path.join(__dirname, '../db/uploads/profilePic', req.files.profilePic.name));
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const updateNewProfilePicDB = async (req, res, next) => {
    let newProfilePic = req.files.profilePic.name;
    if (!newProfilePic) {
        return next();
    }
    const token = req.cookies.auth_token;
    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);
        await usersModel.updateProfilePicDB(userId, newProfilePic);
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const updateNewProfileNameDB = async (req, res, next) => {
    let { newProfileName } = req.body;
    if (!newProfileName) {
        return next();
    }
    if (!newProfileName && !req.files.profilePic.name) {
        return next();
    }
    const token = req.cookies.auth_token;
    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);
        await usersModel.updateUserNameDB(userId, newProfileName);
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const sendRequestFriendship = async (req, res, next) => {
    const idFriend = req.query.id_friend;
    const token = req.cookies.auth_token;
    
    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);
        
        await usersModel.insertRequestFriendshipDB(userId, idFriend);
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const getUserProfileDB = async (req, res, next) => {
    const idUser = req.query.id_user;

    const token = req.cookies.auth_token;
    const { userId } = await authServices.checkIfTokenIsValid(token);

    if (idUser == userId) {
        return res.status(300).redirect('/myProfile');
    }

    try {
        const [ user ] = await usersModel.getUserById(idUser);
        req.userProfileData = user;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const getUserProfilePubsDB = async (req, res, next) => {
    const idUser = req.query.id_user;
    const [ user ] = req.userProfileData;
    
    try {
        const [ pubs ] = await usersModel.getPubsByUserId(user.id_user);
        req.userPubsData = pubs;
        req.userData = {
            user: req.userProfileData,
            pubs: req.userPubsData,
        }
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const getDataFriendship = async (req, res, next) => {
    const idFriend = req.query.id_user;
    const token = req.cookies.auth_token;
    
    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);

        let [ friendship ] = await usersModel.getFriendshipById(userId, idFriend);
        req.friendship = friendship;

        req.userData = {
            user: req.userProfileData,
            pubs: req.userPubsData,
            friendship: req.friendship
        }

        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const searchAllUsersDB = async (req, res, next) => {
    const { nameProfile } = req.body;
    if (!nameProfile) {
        return res.status(404).render('pages/notFound');
    }
    try {
        const [ allUsers ] = await usersModel.getAllUsersByNameProfile(nameProfile);
        req.allUsers = allUsers;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const checkFriendRequest = async (req, res, next) => {
    const token = req.cookies.auth_token;

    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);

        let [ friendships ] = await usersModel.checkIsFriendRequest(userId);
        
        req.friendships = friendships;

        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const acceptRequestFriendship = async (req, res, next) => {
    const idFriend = req.query.id_user;
    const token = req.cookies.auth_token;
    const friendshipDate = new Date();

    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);
        await usersModel.updateFriendshipDB(userId, idFriend, friendshipDate);
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
    uploadProfilePic,
    updateNewProfilePicDB,
    updateNewProfileNameDB,
    getUserProfileDB,
    getUserProfilePubsDB,
    searchAllUsersDB,
    sendRequestFriendship,
    getDataFriendship,
    checkFriendRequest,
    acceptRequestFriendship
 }