const router = require('express').Router();
const { create, getById, getAll, deleteById, mechanicForReparation, updateById, filterByUser } = require('../../models/reparations.model')
const { checkAdmin } = require('../../helpers/middlewares');


router.post('/', checkAdmin, async (req, res) => {

    try {
        const [newReparation] = await create(req.body);
        const [reparation] = await getById(newReparation.insertId)
        res.json(reparation[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})



router.get('/', async (req, res) => {
    try {
        const [reparations] = await getAll();
        res.json(reparations);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});



router.get('/:reparationId', async (req, res) => {
    const { reparationId } = req.params;
    try {
        const [reparation] = await getById(reparationId)
        if (reparation.length === 0) {
            return res.json({ fatal: 'This employeer does not exist' })
        }
        res.json(reparation[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
})


// GET api / reparations / mechanic /: userid
router.get('/mechanic/reparations/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const [reparations] = await filterByUser(userid)
        res.json(reparations)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


//GET api / reparations / mechanic /: userid
router.get('/mechanic/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const [reparations] = await mechanicForReparation(userid)
        res.json(reparations)
    } catch (error) {
        res.json({ fatal: error.message })
    }
});



// router.get('/mechanic/:mechanicId', async (req, res) => {
//     const { mechanicId } = req.params;
//     try {
//         const [mechanic] = await reparationByMechanic(mechanicId)
//         res.json(mechanic)
//     } catch (error) {
//         res.json({ fatal: error.message })
//     }
// });


router.put('/edit/:reparationId', checkAdmin, async (req, res) => {
    const { reparationId } = req.params
    try {
        const [reparation] = await updateById(reparationId, req.body);

        if (reparation.length === 0) {
            return res.json({ fatal: 'This reparation does not exist' })
        }
        res.json(reparation[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


router.delete('/:reparationId', checkAdmin, async (req, res) => {
    const { reparationId } = req.params

    try {

        const [reparation] = await getById(reparationId)
        const [result] = await deleteById(reparationId)
        if (reparation.length === 0) {
            return res.json({ fatal: 'This reparation does not exist' })
        }
        res.json(reparation[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


module.exports = router;