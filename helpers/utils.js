const dayjs = require('dayjs');
const token = require('jsonwebtoken');

const createToken = (user) => {
    const obj = {
        user_id: user.id,
        user_role: user.role,
        exp: dayjs().add(80, 'days').unix()
    }
    return token.sign(obj, 'token_key')
}


module.exports = {
    createToken
}