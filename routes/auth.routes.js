const {Router} = require('express')
const {check} = require('express-validator')
const {login} = require('../controllers/auth.controller')
const {validateFields} = require('../middlewares/validate-fields')
const router = Router()

router.post(
  '/login',
  [
    check('email', 'El correo es requerido').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    validateFields,
  ],
  login
)

module.exports = router
