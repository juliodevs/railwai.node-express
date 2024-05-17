const express = require('express') // Me traigo la dependendencia de expres
const cors = require('cors') // Importo la librería cors
const routerApi = require('./routes')
const os = require('os')
const {logsError,errorHandler,boomErrorHandler} = require('./middlewares/error.handler') // Importo el modulo de errores
const app = express() //Crear una aplicación
const port= 3000//Puerto en donde correrá mi aplicación


app.use(express.json())

const whiteList= ['http://localhost:3000:','http://myapp.co'] // Establezco arreglo con lista de origenes permitidos
const options = {
  origin: (origin,calback)=>{
    if(whiteList.includes(origin)){
      calback(null,true)
    }else{
      calback(new Error('No permitido'))
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
