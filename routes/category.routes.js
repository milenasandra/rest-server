const {Router} = require('express')
const {check} = require('express-validator')
const {
  getCategories,
  createCategory,
} = require('../controllers/category.controller')
const {validateJWT} = require('../middlewares')
const {validateFields} = require('../middlewares/validate-fields')
const router = Router()

router.get('/', getCategories)
router.get('/:id')
router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es requerido').not().isEmpty(),
    validateFields,
  ],
  createCategory
)
router.put('/:id')
router.delete('/:id')

module.exports = router
