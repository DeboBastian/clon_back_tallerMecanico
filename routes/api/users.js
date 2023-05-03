
const router = require('express').Router();
const encript = require('bcryptjs')

const { create, getById, getByEmail, getByDni, deleteById, updateById, getAdminEmployers, getEmployerById, deleteEmployerById, updateAdminById } = require('../../models/users.model')
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');
const { checkAdmin } = require('../../helpers/middlewares');



router.post('/register', checkToken, checkAdmin, async (req, res) => {

    req.body.password = encript.hashSync(req.body.password, 10);

    try {
        const [newUser] = await create(req.body);
        const [user] = await getById(newUser.insertId)
        res.json(user[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})



router.post('/login', async (req, res) => {
    try {
        const [result_dni] = await getByDni(req.body.dni);
        const [result_email] = await getByEmail(req.body.email);

        if (result_dni.length === 0 && result_email.length === 0) {
            return res.json({ fatal: '(DNI / Email) or password wrong' })
        }

        var user
        if (result_dni.length > 0) {
            user = result_dni[0]

            const samePassword = encript.compareSync(req.body.password, user.password);
            if (!samePassword) {
                return res.json({ fatal: 'DNI or password wrong' })
            }
            res.json({
                succes: 'Successful Login',
                token: createToken(user)
            })


        } else if (result_email.length > 0) {
            user = result_email[0]

            const samePassword = encript.compareSync(req.body.password, user.password);
            if (!samePassword) {
                return res.json({ fatal: 'Email or password wrong' })
            }
            res.json({
                succes: 'Successful Login',
                token: createToken(user)
            })
        }
    } catch (error) {
        res.json({ fatal: error.message })
    }
})



router.get('/admins', checkToken, async (req, res) => {

    try {
        const [employeers] = await getAdminEmployers()
        res.json(employeers);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});


router.get('/admins/:id', checkToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [employee] = await getEmployerById(id)
        if (employee.length === 0) {
            return res.json({ fatal: "User doesn't exist" })
        }

        res.json(employee[0]);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.get('/admin', checkToken, async (req, res) => {

    try {

        res.json(req.user.role)

    } catch (error) {
        res.json({ fatal: error.message })
    }



})

// router.get('/:userId', async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const [result] = await getById(userId)
//         if (result.length === 0) {
//             return res.json({ fatal: "User doesn't exist" })
//         }


//         const [users] = await getById(userId);
//         res.json(users)
//     } catch (error) {
//         res.json({ fatal: error.message })
//     }
// })


// router.get('/email/:userEmail', async (req, res) => {
//     const { userEmail } = req.params
//     try {
//         const [result] = await getByEmail(userEmail)
//         console.log(result)
//         if (result.length === 0) {
//             return res.json({ fatal: "Email doesn't exist" })
//         }

//         const [users] = await getByEmail(userEmail);
//         res.json(users)
//     } catch (error) {
//         res.json({ fatal: error.message })
//     }
// })



// router.get('/dni/:userDni', async (req, res) => {
//     const { userDni } = req.params;

//     try {
//         const [result] = await getByDni(userDni)
//         if (result.length === 0) {
//             return res.json({ fatal: "User doesn't exist" })
//         }
//         const [users] = await getByDni(userDni);
//         res.json(users)
//     } catch (error) {
//         res.json({ fatal: error.message })
//     }
// })


// EDITAR EMPLEADO DE ADMIN
router.put('/edit/:userId', checkToken, checkAdmin, async (req, res) => {
    const { userId } = req.params
    try {
        const [user] = await updateAdminById(userId, req.body);

        if (user.length === 0) {
            return res.json({ fatal: 'This employeer does not exist' })
        }
        res.json(user)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


//BORRAR EMPLEADO DE ADMIN
router.delete('/admin/:adminId', checkToken, checkAdmin, async (req, res) => {
    const { adminId } = req.params

    try {
        const [admin] = await getEmployerById(adminId)
        const [result] = await deleteEmployerById(adminId)
        if (admin.length === 0) {
            return res.json({ fatal: 'This employeer does not exist' })
        }
        res.json(admin[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


module.exports = router;