
const getAll = () => {
    return db.query('SELECT * FROM users WHERE role = "mechanic"')
}


const getById = (mechanicId) => {
    return db.query('select * from users WHERE role = "mechanic" and id = ?', [mechanicId])
}


const deleteById = (id) => {
    return db.query('delete from users where role = "mechanic" and id = ?', [id])
}


module.exports = { getAll, getById, deleteById }