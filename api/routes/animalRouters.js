

const expres = require('express')
const AnimalService = require('./services/animal.services')
const validatorHandler = require ('./../middlewares/validator.handler')
const {createAnimalSchema,updateAnimalSchema,deleteAnimalSchema,getAnimalSchema} = require('./../middlewares/schema/animal.schema')
const router = expres.Router()
const service = new AnimalService()

//Recibiendo parámetros opcionales de consulta. Los parametros opcionales no vienen definidos en la ruta
router.get('/', async (req,res)=>{
  //const {limit, offset}= req.query //Recojo los parametros limit y offset
  const animal = await service.find()
  res.status(200).json({
    size:animal.length,
    animal
  })

})

router.get('/:id',async (req,res,next)=>{
  validatorHandler(getAnimalSchema,'params')
    try {
        const id = req.params.id
        const animal = await service.findOne(id)
        res.status(200).json({
          animal
        })
    } catch (error) {
      next(error)
    }
  }
)
// Metodo POST

router.post('/',
 validatorHandler(createAnimalSchema,'body'),
  async (req,res,next)=>{
      try {
        const data = req.body
        const animal = await service.create(data)
        res.status(200).json({
          message:"Created",
          animal
        })
      } catch (error) {
        next(error)
      }
    }
)

//Metodo PATCH

router.patch('/:id',
  validatorHandler(getAnimalSchema,'params'),
    validatorHandler(updateAnimalSchema,'body'),
      async (req,res,next)=>{
          try {
            const id= req.params.id
            const data= req.body
            const animal = await service.update(id,data)
            res.json({
              message:"Updated",
              animal
            })
          } catch (error) {
            next(error)
          }
        }
)

//Metodo DELETE

router.delete('/:id',
  validatorHandler(deleteAnimalSchema,'params'),
    async (req,res,next)=>{
      try {
        const id= req.params.id
        const animal = await service.delete(id)
        res.status(200).json({
          message:"Deleted",
          id
        })
      } catch (error) {
        next(error)
      }
    }
)

module.exports = router
