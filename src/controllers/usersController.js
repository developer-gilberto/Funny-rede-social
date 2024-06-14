const usersModel = require("../models/usersModel");

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
};

const redirectUserHome = (req, res) => {
    return res.status(300).redirect(`/home`);
}

const renderUserHome = async (req, res) => {
    const { userId } = req.userData;
    try {
        const [ queryResult ] = await usersModel.getUserById(userId);// FAZER JOIN DA TABELA USERS COM PUBS
        const user = queryResult[0];
        const [ queryResultPubs ] = await usersModel.getPubsByUserName(user.user_name);
        const pubs = queryResultPubs;
        res.render('pages/home', { user, pubs });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const renderUserProfile = async (req, res) => {
    const userName = req.params.userName;
    try {
        const [ queryResult ] = await usersModel.getUserByUserName(userName);
        const user = queryResult[0];
        const [ queryResultPubs ] = await usersModel.getPubsByUserName(userName);
        const pubs = queryResultPubs;
        return res.status(200).render('pages/profile', { user, pubs });
        // return res.status(300).redirect(`/profile?user=${user}&pubs=${pubs}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}
        
const renderCreateAccount = (req, res) => {
    return res.status(200).render("pages/createAccount");
}

const logout = (req, res) => {
    const userName = req.params.userName;
    return res.status(200).render('pages/login', { userName });
}



// const publish = async (req, res) => {
//     try {
        // const { userName, img_perfil } = req.userData;
        // POSSO PEGAR O ID DO USER QUE ESTÁ NA URL
        // const { textPub } = req.body;
        // const imgPub = req.files.imgPub.name;
//         const userName = req.params.userName;
//         res.status(300).redirect(`/home/${userName}`);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
//     }
// }

module.exports = {
    registerAccountDB,
    redirectUserHome,
    renderUserHome,
    renderUserProfile,
    renderCreateAccount,
    logout,
    // publish
}