
const express = require('express')
const productsRouter = require('./productsRouters') //Llamo el modulo productsRouter
const userRouter = require('./userRouters')
const vehiculotRouter = require('./vehiculoRouters')
const animalRouters = require('./animalRouters')
const homeRouter = require('./homeRouter')

//Función que recibe el app
function routerApi(app){
  const router = express.Router()
  app.use('/api/v1',router)
  router.use('/products',productsRouter); //Defino el endopoint
  router.use('/users',userRouter);
  router.use('/vehiculo',vehiculotRouter)
  router.use('/animal',animalRouters)
  router.use('/home',homeRouter)
}




module.exports = routerApi // Exporto la función routerApi
