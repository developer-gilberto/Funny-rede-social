const usersModel = require("../models/usersModel");

const registerAccountDB = async (req, res) => {
    try {
        const { userName, userEmail } = req.body;
        const encryptedPassword = req.encryptedPassword;
        const creationDate = new Date();
        const [ results ] = await usersModel.insertUserDB(userName, userEmail, encryptedPassword, creationDate);
        // req.files.img_perfil.mv(path.join(__dirname, '../db/uploads/', req.files.img_perfil.name));
        console.log(`> Usuário "${userName}" registrado com sucesso no DB.`);
        res.status(300).redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Algo deu errado :( <br>Tente novamente mais tarde. <br>' + err);
    }
};

const redirectUserHome = async (req, res) => {
    try {
        res.status(300).redirect(`/home`);
    } catch (err) {
        console.error(err);
    }
}

const renderUserHome = async (req, res) => {
    // ATENÇÃO >> BUSCAR TODOS OS DADOS DO USER NO DB PELO 'ID', E RENDERIZAR NA HOME
    const { userId } = req.userData;
    const [ queryResult ] = await usersModel.getUserById(userId);
    const user = queryResult[0]
    const userName = user.user_name;
    res.render('pages/home', { userName })
}

const pub = async (req, res) => {
    // const { userName, img_perfil } = req.userData;
    // POSSO PEGAR O ID DO USER QUE ESTÁ NA URL
    const userName = 'Gilberto'
    const img_perfil = 'imgPerfil';
    const { textPub } = req.body;
    const imgPub = 'imgPub' // req.files.imgPub.name;
    // res.send(textPub + imgPub);
    res.render('pages/home', { userName, imgPub });
}

module.exports = {
    registerAccountDB,
    redirectUserHome,
    renderUserHome,
    pub
}