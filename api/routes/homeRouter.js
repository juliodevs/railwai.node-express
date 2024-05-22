
const expres = require('express')
const router = expres.Router()


router.get('/',(req,res)=>{
  res.send('Hola, este es el Home de mi server en express. Bienvenido!!!')
}) //Defino una ruta


//Creando nueva ruta
router.get('/nueva-ruta',(req,res)=>{
  res.send('Hola, soy una nueva ruta')
})

module.exports = router
