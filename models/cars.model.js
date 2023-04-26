const create = ({ chasis, registration, brand, model, color, km, year, doors, type, fuel, damages, clients_id }) => {

    return db.query(
        'insert into cars (chasis, registration, brand, model, color, km, year, doors, type, fuel, damages, clients_id) values (?,?,?,?,?,?,?,?,?,?,?,?)', [chasis, registration, brand, model, color, km, year, doors, type, fuel, damages, clients_id]
    )
}

const getById = (carId) => {
    return db.query('select * from cars where id = ?', [carId])
}


const getAll = () => {
    return db.query('select * from cars')
}


const filterByClient = (carsId) => {
    return db.query(`select * from cars ca
JOIN clients c on ca.clients_id = c.id
where ca.id = ?`, [carsId])
}


const carOfClient = (clientId) => {
    return db.query(`select * from cars where clients_id = ?`, [clientId])
}

const updateById = (carId, {chasis, registration, brand, model, color, km, year, doors, type, fuel, damages}) => {
    return db.query(
        'update cars set chasis = ?, registration = ?, brand = ?, model = ?, color = ?, km = ?, year = ?, doors = ?, type = ?, fuel = ?, damages = ? where id = ?',
        [chasis, registration, brand, model, color, km, year, doors, type, fuel, damages, carId]
    )
};

const deleteById = (carId) => {
    return db.query('delete from cars where cars.id = ?', [carId])
}

module.exports = { create, getById, getAll, filterByClient, carOfClient, deleteById, updateById }