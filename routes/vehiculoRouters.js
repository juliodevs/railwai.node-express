const express = require('express')
const VehiculoService = require('./services/vehiculo.services')
const validatorHandler = require('./../middlewares/validator.handler')
const {createVehiculoSchema,updateVehiculoSchema,deleteVehiculoSchema,getVehiculoSchema} = require('./../middlewares/schema/vehiculo.schema')
const router = express.Router()
const service = new VehiculoService()



router.get('/', async (req,res)=>{
  const vehiculo = await service.find()
  res.status(200).json({
    size: vehiculo.length,
    vehiculo
  })
})


router.get('/:matricula',
  validatorHandler(getVehiculoSchema,'params'),
    async (req,res,next)=>{
        try {
          const matricula = req.params.matricula
          const vehiculo = await service.findOne(matricula)
          res.status(200).json(vehiculo)
        } catch (error) {
          next(error)
        }
      }
)


// Metodo POST

router.post('/',
  validatorHandler(createVehiculoSchema,'body'),
    async (req,res,next)=>{
        try {
          const data = req.body
          const vehiculo= await service.create(data)
          res.status(200).json({
            message:"Created",
            vehiculo
          })
        } catch (error) {
          next(error)
        }
      }
  )


// Metodo PATCH

router.patch('/:matricula',
  validatorHandler(getVehiculoSchema,'params'),
    validatorHandler(updateVehiculoSchema,'body'),
      async (req,res,next)=>{
          try {
            const matricula = req.params.matricula
            const data = req.body
            const vehiculo = await service.update(matricula,data)
            res.json({
              message:"Updated",
              vehiculo
            })
          } catch (error) {
            next(error)
        }
    }
)


// Metodo DELETE

router.delete('/:matricula',
  validatorHandler(deleteVehiculoSchema,'params'),
    async (req,res,next)=>{
        try {
          const matricula= req.params.matricula
          const respuesta = await service.delete(matricula)
          res.status(200).json({
            message:"Deleted",
            respuesta
          })
        } catch (error) {
          next(error)
      }
  }
)
module.exports = router
