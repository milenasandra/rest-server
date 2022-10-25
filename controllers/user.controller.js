const {request, response, json} = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const getUsers = async (req = request, res = response) => {
  //  Url/api/users/?name=Sandra&date=2022-04-12 --->signo del query ? ----> se pueden mandar varios con el &
  try {
    let {from = 0, lot = 5} = req.query
    from = from <= 0 || isNaN(from) ? 0 : from - 1
    const query = {status: true}
    const [users, total] = await Promise.all([
      User.find(query).skip(from).limit(lot),
      User.countDocuments(query),
    ])

    req.res.status(200).json({
      total,
      users,
      from: from + 1,
      lot: Number(lot),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const getUsersById = (req = request, res = response) => {
  //  Url/api/users/15 ----> signo del segmento / ---> se tiene que nombrar en las rutas
  const id = req.params.id
  res.json({
    msg: 'Usuario por id - controller',
    id,
  })
}

const createUser = async (req = request, res = response) => {
  //  Url/api/users/ ----> Es el objeto en JSON

  try {
    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    // Verificar si el correo ya existe en la BD

    user.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())

    await user.save()

    res.status(201).json({
      msg: 'post API - Controller',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const updateUser = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const {password, google, ...data} = req.body

    if (password) {
      data.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    }
    const user = await User.findByIdAndUpdate(id, data, {new: true})

    res.json({
      msg: 'put API -  controller',
      id,
      body,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const deleteUser = async (req = request, res = response) => {
  try {
    const {id} = req.params

    // Borrar definitivamente de la BD
    // const deletedUser = await User.findByIdAndDelete(id)

    // Borrado suave
    const deletedUser = await User.findByIdAndUpdate(
      id,
      {status: false},
      {new: true}
    )

    res.json({
      msg: 'delete API',
      deleteUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
