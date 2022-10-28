const {Router} = require('express')
const {check} = require('express-validator')
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersById,
} = require('../controllers/user.controller')
const {
  isValidRole,
  emailExist,
  userByIdExist,
} = require('../helpers/db-valitators')
const middlewares = require('../middlewares')

// const {validateFields} = require('../middlewares/validate-fields')
// const {validateJWT} = require('../middlewares/validate-jwt')
// const {isRole} = require('../middlewares/validate-role')

const {isRole, validateFields, validateJWT} = require('../middlewares')

const router = Router()

router.get('/', getUsers)

router.get('/:id', getUsersById)

router.post(
  '/',
  [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 caracteres o más').isLength({
      min: 6,
    }),
    // check('password', 'La contraseña no es fuerte').isStrongPassword(),
    check('role', 'El rol es requerido').not().isEmpty(),
    // check('role', 'El rol no es válido, debe ser ADMIN_ROLE o USER_ROLE').isIn([
    //   'ADMIN_ROLE',
    //   'USER_ROLE',
    // ]),
    check('role').custom(isValidRole),
    validateFields,
  ],
  createUser
)

router.put(
  '/:id',
  [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(userByIdExist),
    validateFields,
  ],

  updateUser
)

router.delete(
  '/:id',
  [
    validateJWT,
    isRole('ADMIN_ROLE'),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(userByIdExist),
    validateFields,
  ],
  deleteUser
)

module.exports = router
