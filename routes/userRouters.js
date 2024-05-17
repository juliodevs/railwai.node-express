const express = require('express')
const userServices = require ('./services/user.services')
const validatorHandler = require('./../middlewares/validator.handler')
const {createUserSchema,updateUserSchema,getUserSchema} = require('./../middlewares/schema/user.schema')
const router = express.Router()
const service = new userServices()


router.get('/:id_user',async (req,res,next)=>{
  try {
    const {id_user}=req.params
    const user = await service.findOne(id_user)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
 }
)

router.get('/',async (req,res,next)=>{
  try {
    const users = await service.find()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
 }
)


//Metod POST

router.post('/',
  validatorHandler(createUserSchema,'body'),
    async (req,res,next)=>{
      try {
        const data = req.body
        const user = await service.create(data)
        res.status(200).json({
          message:"Created",
          user
        })
        } catch (error) {
          next(error)
        }
      }
)


// Metodo PATCH

router.patch('/:id',
validatorHandler(getUserSchema,'params'),
  validatorHandler(updateUserSchema,'body'),
    async (req,res,next)=>{
      try {
        const id = req.params.id
        const changes = req.body

        const user = await service.update(id,changes)
        res.json({
          message:"Updated",
          user
        })
        } catch (error) {
          next (error)
        }
    }
)

//Metodo Delete

router.delete('/:id',
  validatorHandler(getUserSchema,'params'),
    async (req,res,next)=>{
      try {
        const {id} = req.params
        const user = await service.delete(id)
        res.json({
          message:"Deleted",
          user
        })
        } catch (error) {
          next(error)
        }
      }
)

module.exports = router; // Exporto el modulo
