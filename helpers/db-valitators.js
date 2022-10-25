const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const existRole = await Role.findOne({role})
  if (!existRole) {
    throw new Error(`El rol ${role} no está en la BD`)
  }
}

const emailExist = async (email) => {
  const user = await User.findOne({email})
  if (user) {
    throw new Error(`El correo ya se encuentra registrado`)
  }
}

const userByIdExist = async (id = '') => {
  const user = await User.findById(id)
  if (!user) {
    throw new Error(`Usuario con ID ${id} ya existe`)
  }
}

module.exports = {
  userByIdExist,
  isValidRole,
  emailExist,
}
