const express = require('express') // Me traigo la dependendencia de expres
const cors = require('cors') // Importo la librería cors
const routerApi = require('./routes')
const os = require('os')
const {logsError,errorHandler,boomErrorHandler} = require('./middlewares/error.handler') // Importo el modulo de errores
const app = express() //Crear una aplicación
const port= process.env.PORT || 3000//Puerto en donde correrá mi aplicación


app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options))


routerApi(app);


app.use(logsError)
app.use(boomErrorHandler)
app.use(errorHandler)
app.listen(port,()=>{
  console.log('Puerto'+port)
})//Pongo a escuchar la aplicación por el puerto que definí.

module.exports = app
