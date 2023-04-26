const { create, getById, getAll, filterByClient, deleteById, updateById } = require('../../models/cars.model');
const { checkAdmin } = require('../../helpers/middlewares');

const router = require('express').Router();



router.post('/', checkAdmin, async (req, res) => {
    try {
        const [newCar] = await create(req.body);
        const [car] = await getById(newCar.insertId)
        res.json(car[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


router.get('/', async (req, res) => {
    try {
        const [cars] = await getAll();
        res.json(cars);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});



router.get('/:carId', async (req, res) => {
    const { carId } = req.params;
    try {
        const [car] = await getById(carId)
        if (car.length === 0) {
            return res.json({ fatal: 'This car does not exist' })
        }
        res.json(car[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
})



// GET api/cars/client/:clientid
router.get('/client/:clientid', async (req, res) => {
    const { clientid } = req.params;
    try {
        const [cars] = await filterByClient(clientid)
        res.json(cars)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


router.put('/:carId', checkAdmin, async (req, res) => {
    const { carId } = req.params
    console.log(req.body);
    try {
        const [car] = await updateById(parseInt(carId), req.body);
        res.json(car[0])

    } catch (error) {
        res.json({ fatal: error.message });
    }
});



router.delete('/:carId', checkAdmin, async (req, res) => {
    const { carId } = req.params

    try {
        const [car] = await getById(carId)
        const [result] = await deleteById(carId)
        if (car.length === 0) {
            return res.json({ fatal: 'This car does not exist' })
        }
        res.json(car[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


module.exports = router;