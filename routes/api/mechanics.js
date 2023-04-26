const { getAll, getById, deleteById, reparationFilterByUser } = require('../../models/mechanicsmodel');
const { checkAdmin } = require('../../helpers/middlewares');


const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const [mechanics] = await getAll();
        res.json(mechanics);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});



router.get('/:mechanicId', async (req, res) => {
    const { mechanicId } = req.params;
    try {
        const [mechanic] = await getById(mechanicId)

        if (mechanic.length === 0) {
            return res.json({ fatal: 'This employeer does not exist' })
        }
        res.json(mechanic[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
})


router.get('/reparations/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const [reparations] = await reparationFilterByUser(userid)
        res.json(reparations)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


router.delete('/:mechanicId', checkAdmin, async (req, res) => {
    const { mechanicId } = req.params

    try {
        const [mechanic] = await getById(mechanicId)
        const [result] = await deleteById(mechanicId)
        if (mechanic.length === 0) {
            return res.json({ fatal: 'This employeer does not exist' })
        }
        res.json(mechanic[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


//TODO:
// falta put con checkAdmin

module.exports = router;