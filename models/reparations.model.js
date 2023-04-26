const tokengen = require("tokengn")

const create = ({ type_rep, reparation, price, users_id, cars_id }) => {

    return db.query(
        'insert into reparations ( type_rep, reparation, price, bill_number,users_id, cars_id) values (?,?,?,?,?,?)', [type_rep, reparation, price, tokengen(), users_id, cars_id]
    )

}

const getAll = () => {
    return db.query('select * from reparations')
}


const getById = (reparationId) => {
    return db.query('select reparations.*, cars.chasis, cars.brand, cars.model from reparations, cars where reparations.cars_id = cars.id and reparations.id = ?', [reparationId])
}


const mechanicForReparation = (userId) => {
    return db.query(`SELECT * FROM reparations r 
                    JOIN users u on r.users_id = u.id
                    where r.id = ?`, [userId])
}

// const reparationByMechanic = (userId) => {
//     return db.query(`SELECT * FROM reparations where users_id = ?`, [userId])
// }

const filterByUser = (userId) => {
    return db.query(`SELECT * FROM reparations r 
                    JOIN cars c on r.cars_id = c.id
                    where users_id = ?`, [userId])
}

const deleteById = (carId) => {
    return db.query('delete from reparations where reparations.id = ?', [carId])
}


const updateById = (reparationId, { status, type_rep, reparation, price, users_id }) => {
    return db.query(` update reparations set status = ?, type_rep = ?, reparation = ?, price = ?, users_id = ? where id = ?`,

        [status, type_rep, reparation, price, users_id, reparationId]
    )
}


module.exports = { create, getById, getAll, mechanicForReparation, deleteById, updateById, filterByUser }