const usersModel = require("../models/usersModel");

const registerAccountDB = async (req, res) => {
    try {
        const { userName, userEmail } = req.body;
        const encryptedPassword = req.encryptedPassword;
        const creationDate = new Date();
        const [ results ] = await usersModel.insertUserDB(userName, userEmail, encryptedPassword, creationDate);
        console.log(`> Usuário "${userName}" registrado com sucesso no DB.\n`, results);
        res.status(300).redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
};

const redirectUserHome = async (req, res) => {
    const userName = req.params.userName;
    try {
        return res.status(300).redirect(`/home/${userName}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
}

const renderUserHome = async (req, res) => {
    // ATENÇÃO >> BUSCAR TODOS OS DADOS DO USER NO DB PELO 'ID', E RENDERIZAR NA HOME
    const { userId } = req.userData;
    const [ queryResult ] = await usersModel.getUserById(userId);
    const user = queryResult[0];
    const [ queryResultPubs ] = await usersModel.getPubsByUser(user.user_name);
    const pubs = queryResultPubs;
    res.render('pages/home', { user, pubs });
    // res.render('pages/home', { user });
}

const publish = async (req, res) => {
    // const { userName, img_perfil } = req.userData;
    // POSSO PEGAR O ID DO USER QUE ESTÁ NA URL
    // const { textPub } = req.body;
    // const imgPub = req.files.imgPub.name;
    const userName = req.params.userName;
    res.status(300).redirect(`/home/${userName}`);
}

module.exports = {
    registerAccountDB,
    redirectUserHome,
    renderUserHome,
    publish
}