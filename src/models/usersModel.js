const connection = require('../db/connection');

const getAllUsers = async () => {
    try {
        const allUsers = await connection.execute('SELECT * FROM users');
        return allUsers;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

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
    try {
        const query = 'INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?)';
        const results = await connection.execute(query, [userName, userEmail, encryptedPassword, creationDate]);
        return results;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

module.exports = {
    getAllUsers,
    getUserByEmail,
    getUserById,
    insertUserDB,
    searchEmailDB,
    searchPasswordDB
}