const jwt = require('jsonwebtoken');
const { getById } = require('../models/users.model')

const checkToken = async (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.json({ fatal: 'You must include the authorization header' })
    }
    const token = req.headers['authorization'];

    let obj;
    try {
        obj = jwt.verify(token, 'token_key')
    } catch (error) {
        return res.json({ fatal: 'Wrong TOKEN' })
    }

    const [result] = await getById(obj.user_id);

    req.user = result[0]
    next();

}


const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.json('DEBES SER ADMIN')
    }
    next();
}

module.exports = {
    checkToken, checkAdmin
}