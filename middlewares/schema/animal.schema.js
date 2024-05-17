const Joi = require('joi')

const id = Joi.string().uuid()
const gato= Joi.string()
const perro= Joi.string()
const ave = Joi.string()

const createAnimalSchema = Joi.object({
  gato:  gato.required(),
  perro: perro.required(),
  ave:ave.required()
})

const updateAnimalSchema = Joi.object({
  gato:gato,
  perro,perro,
  ave:ave
})

const deleteAnimalSchema = Joi.object({
  id:id.required()
})

const getAnimalSchema = Joi.object({
  id:id.required()
})

module.exports = {createAnimalSchema,updateAnimalSchema,deleteAnimalSchema,getAnimalSchema}
