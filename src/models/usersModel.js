const connection = require('../db/connection');

const getUserByEmail = async (userEmail) => {
    try {
        const query = 'SELECT id_user, user_name, user_email, profile_pic, creation_date FROM users WHERE user_email = ?'
        const user = await connection.execute(query, [userEmail]);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const getUserById = async (idUser) => {
    try {
        const query = 'SELECT id_user, user_name, user_email, profile_pic, creation_date FROM users WHERE id_user = ?'
        const user = await connection.execute(query, [idUser]);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const getUserByUserProfileName = async (userProfileName) => {
    try {
        const query = 'SELECT id_user, user_name, user_email, profile_pic, creation_date FROM users WHERE user_name = ?'
        const user = await connection.execute(query, [userProfileName]);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const searchEmailDB = async (userEmail) => {
    try {
        const query = 'SELECT user_email FROM users WHERE user_email = ?'
        const [ queryResult ] = await connection.execute(query, [userEmail]);
        return queryResult;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const getPasswordDB = async (userEmail) => {
    try {
        const query = 'SELECT user_password FROM users WHERE user_email = ?'
        const [ queryResult ] = await connection.execute(query, [userEmail]);
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

const insertPubDB = async (userId, userName, textPub, imgPubName, creationDatePub) => {
    const query = 'INSERT INTO pubs VALUES (DEFAULT, ?, ?, ?, ?, ?)';
    try {
        const result = await connection.execute(query, [userId, userName, textPub, imgPubName, creationDatePub]);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error;
    }
}

const getPubsByUserId = async (userId) => {
    try {
        const query = 'SELECT * FROM pubs WHERE id_user = ? ORDER BY date_pub DESC'
        const pubs = await connection.execute(query, [userId]);
        return pubs;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const updateProfilePicDB = async (userId, newProfilePic) => {
    const query = 'UPDATE users SET profile_pic = ? WHERE id_user = ?'
    try {
        const result = await connection.execute(query, [newProfilePic, userId]);
        return result;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const updateUserNameDB = async (userId, newProfileName) => {
    const query = 'UPDATE users SET user_name = ? WHERE id_user = ?'
    try {
        const result = await connection.execute(query, [newProfileName, userId]);
        return result;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const getAllUsersByNameProfile = async (nameProfile) => {
    const query = 'SELECT id_user, user_name, user_email, profile_pic, creation_date FROM users WHERE user_name LIKE ?';
    const values = [`${nameProfile}%`];
    try {
        const user = await connection.execute(query, values);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const insertRequestFriendshipDB = async (idUser, idFriend) => {
    const query = 'INSERT IGNORE INTO friendships VALUES (?, ?, ?, ?)';
    try {
        const result = await connection.execute(query, [idUser, idFriend, false, null]);
        return result;
    } catch (err) {
        console.log(err);
        throw new Error;
    }
}

const updateFriendshipDB = async (userId, idFriend, friendshipDate) => {
    const query = `UPDATE friendships
                    SET friendship = ?, friendship_date = ?
                    WHERE id_user = ? AND id_friend = ? OR id_user = ? AND id_friend = ?`

    try {
        await connection.execute(query, [true, friendshipDate, userId, idFriend, idFriend, userId]);
    } catch (err) {
        console.log(err);
        throw new Error;
    }
}

const getFriendshipById = async (userId, idFriend) => {
    try {
        // const query = `SELECT * FROM friendships WHERE id_user = ? AND id_friend = ?`
        const query = `SELECT * FROM friendships WHERE id_user = ? AND id_friend = ? OR id_user = ? AND id_friend = ?`
        const friendship = await connection.execute(query, [userId, idFriend, idFriend, userId]);
        return friendship;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

const checkIsFriendRequest = async (userId) => {
    try {
        const query = `SELECT DISTINCT u.id_user, u.user_name, u.user_email, u.profile_pic, u.creation_date
                        FROM users u
                        INNER JOIN friendships f ON u.id_user = f.id_user
                        WHERE f.id_friend = ? AND f.friendship = 0`
        const friendship = await connection.execute(query, [userId]);
        return friendship;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    getUserByUserProfileName,
    insertUserDB,
    searchEmailDB,
    getPasswordDB,
    insertPubDB,
    getPubsByUserId,
    updateProfilePicDB,
    updateUserNameDB,
    getAllUsersByNameProfile,
    insertRequestFriendshipDB,
    getFriendshipById,
    checkIsFriendRequest,
    updateFriendshipDB
}