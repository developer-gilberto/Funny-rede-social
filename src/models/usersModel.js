const connection = require('../db/connection');

const getUserByEmail = async (userEmail) => {
    try {
        const user = await connection.execute('SELECT * FROM users WHERE user_email = ?', [userEmail]);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const getUserById = async (idUser) => {
    try {
        const user = await connection.execute('SELECT * FROM users WHERE id_user = ?', [idUser]);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const searchEmailDB = async (userEmail) => {
    try {
        const [ queryResult ] = await connection.execute('SELECT user_email FROM users WHERE user_email = ?', [userEmail]);
        return queryResult;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const searchPasswordDB = async (userEmail) => {
    try {
        const [queryResult] = await connection.execute('SELECT user_password FROM users WHERE user_email = ?', [userEmail]);
        const encryptedPassword = queryResult[0].user_password;
        return encryptedPassword;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const insertUserDB = async (userName, userEmail, encryptedPassword, creationDate) => {
    const query = 'INSERT INTO users VALUES (DEFAULT, ?, ?, ?, DEFAULT, ?)';
    try {
        const results = await connection.execute(query, [userName, userEmail, encryptedPassword, creationDate]);
        return results;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const insertPubDB = async (userId, textPub, imgPubName, creationDatePub) => {
    const query = 'INSERT INTO pubs VALUES (DEFAULT, ?, ?, ?, ?)';
    try {
        const result = await connection.execute(query, [userId, textPub, imgPubName, creationDatePub]);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error;
    }
}

const getPubsByUserId = async (userId) => {
    const query = `
        SELECT pubs.id_pub, pubs.text_pub, pubs.img_pub, pubs.date_pub
        FROM pubs
        INNER JOIN users ON pubs.id_user = users.id_user
        WHERE users.id_user = ?
        ORDER BY date_pub DESC
    `
    try {
        const pubs = await connection.execute(query, [userId]);
        return pubs;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const updateProfilePicDB = async (userId, profilePicName) => {
    const query = 'UPDATE users SET profile_pic = ? WHERE id_user = ?'
    try {
        const result = await connection.execute(query, [profilePicName, userId]);
        return result;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    insertUserDB,
    searchEmailDB,
    searchPasswordDB,
    insertPubDB,
    getPubsByUserId,
    updateProfilePicDB
}