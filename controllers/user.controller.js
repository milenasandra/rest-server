const {request, response} = require('express')

const getUsers = (req = request, res = response) => {
  //  Url/api/users/?name=Sandra&date=2022-04-12 --->signo del query ? ----> se pueden mandar varios con el &
  const {name, date} = req.query
  req.res.status(200).json({
    msg: 'Get - controller',
    name,
    date,
  })
}

const getUsersById = (req = request, res = response) => {
  //  Url/api/users/15 ----> signo del segmento / ---> se tiene que nombrar en las rutas
  const id = req.params.id
  req.json({
    msg: 'Usuario por id - controller',
    id,
  })
}

const createUser = (req = request, res = response) => {
  //  Url/api/users/ ----> Es el objeto en JSON
  const data = req.body
  res.status(201).json({
    msg: 'post API - Controller',
    data,
  })
}

const updateUser = (req = request, res = response) => {
  const id = req.params.id
  const body = req.body
  res.json({
    msg: 'put API -  controller',
    id,
    body,
  })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  res.json({
    msg: 'delete API',
    id,
  })
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
