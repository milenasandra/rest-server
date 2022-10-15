const express = require('express')
const cors = require('cors')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'

    // Middleawares
    this.middlewares()

    //   Rutas de mi app
    this.routes()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
