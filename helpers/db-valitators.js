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

module.exports = {
  isValidRole,
  emailExist,
}
