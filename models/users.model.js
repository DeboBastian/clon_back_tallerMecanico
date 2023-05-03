
const create = ({ name, surname, birthdate, dni, phone, email, username, password, role }) => {

    return db.query(
        'insert into users (name, surname, birthdate, dni, phone, email, username, password, role) values (?,?,?,?,?,?,?,?,?)', [name, surname, birthdate, dni, phone, email, username, password, role]
    )

}


const getAll = () => {
    return db.query('select * from users')
}


const getById = (userId) => {
    return db.query('select * from users where id = ?', [userId])
}


const getByDni = (userDNI) => {
    return db.query('select * from users where dni = ?', [userDNI])
}


const getByEmail = (email) => {
    return db.query('select * from users where email = ?', [email])
}


const deleteById = (id) => {
    return db.query('delete from users where users.id = ?', [id])
}


const updateAdminById = (userId, { name, surname, birthdate, dni, phone, email, username, password }) => {
    return db.query(` update taller_mecanico_proyecto.users set name = ?, surname = ?, birthdate = ?, dni = ?, phone = ?, email = ?, username = ?, password = ? where id = ?`,

        [name, surname, birthdate, dni, phone, email, username, password, userId]
    )
}



const getAdminEmployers = () => {
    return db.query('SELECT * FROM users WHERE role = "admin"')
}


const getEmployerById = (adminId) => {
    return db.query('select * from users WHERE role = "admin" and id = ?', [adminId])
}


const deleteEmployerById = (id) => {
    return db.query('delete from users where role = "admin" and id = ?', [id])
}




module.exports = { create, getAll, getByDni, getById, getByEmail, deleteById, updateAdminById, getAdminEmployers, getEmployerById, deleteEmployerById }

