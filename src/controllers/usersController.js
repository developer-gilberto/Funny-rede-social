const usersModel = require("../models/usersModel");
const authServices = require('../services/checkIfTokenIsValid');

const registerAccountDB = async (req, res) => {
    const { userName, userEmail } = req.body;
    const encryptedPassword = req.encryptedPassword;
    const creationDate = new Date().toLocaleString();
    try {
        await usersModel.insertUserDB(userName, userEmail, encryptedPassword, creationDate);
        console.log(`> Usuário "${userName}" registrado com sucesso no DB.\n`);
        res.status(300).redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const redirectUserHome = (req, res) => {
    return res.status(300).redirect('/home');
}

const redirectMyProfile = (req, res) => {
    return res.status(300).redirect('/myProfile');
}

const loadUserHome = async (req, res) => {

    const token = req.cookies.auth_token;
    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);
        const [ queryResult ] = await usersModel.getUserById(userId);
        const user = queryResult[0];
        const [ queryResultPubs ] = await usersModel.getPubsByUserId(userId);
        const pubs = queryResultPubs;

        let friendships = req.friendships;
        const numberFriendRequest = friendships.length;
        
        if (friendships.length == 0) {
            // return res.render('pages/home', { user, pubs, notification: false });
            return res.render('pages/home', { user, pubs, friendships });
        }
        // return res.render('pages/home', { user, pubs, friendships, notification: true });
        return res.render('pages/home', { user, pubs, friendships, numberFriendRequest });
        
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const loadMyProfile = async (req, res) => {
    const token = req.cookies.auth_token;
    try {
        const { userId } = await authServices.checkIfTokenIsValid(token);
        const [ queryResult ] = await usersModel.getUserById(userId);
        const user = queryResult[0];
        const [ queryResultPubs ] = await usersModel.getPubsByUserId(userId);
        const pubs = queryResultPubs;
        return res.status(200).render('pages/myProfile', { user, pubs });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}
        
const loadCreateAccount = (req, res) => {
    return res.status(200).render("pages/createAccount");
}

const renderUserProfile = async (req, res) => {
    let { user, pubs, friendship } = req.userData;
    user = user[0];

    try {
        if (friendship.length > 0) {

            if (friendship[0].friendship === 0 && friendship[0].id_user == user.id_user) {
                const friendRequest = true;
                return res.status(200).render('pages/userProfile', { user, pubs, friendRequest, friendship: 'Enviou solicitação de amizade para você.' });
            }
            if (friendship[0].friendship === 0) {
                return res.status(200).render('pages/userProfile', { user, pubs, friendship: 'Solicitação de amizade enviada...' });
            }
            if (friendship[0].friendship === 1) {
                return res.status(200).render('pages/userProfile', { user, pubs, friendship: 'Amigos' });
            }
        }

        return res.status(200).render('pages/userProfile', { user, pubs, friendship: false });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const renderFoundProfiles = async (req, res) => {
    const users = req.allUsers;

    if (users.length > 0) {
        return res.status(200).render('pages/foundProfile', { users });
    }
    return res.status(404).render('pages/notFound');
}

const redirectUserProfile = async (req, res) => {
    try {
        const idFriend = req.query.id_friend;

        return res.status(300).redirect(`/userProfile?id_user=${idFriend}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

module.exports = {
    registerAccountDB,
    redirectUserHome,
    redirectMyProfile,
    loadUserHome,
    loadMyProfile,
    loadCreateAccount,
    renderUserProfile,
    renderFoundProfiles,
    redirectUserProfile
}