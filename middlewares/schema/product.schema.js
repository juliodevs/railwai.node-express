const Joi = require('joi') // Importo libreria joi

// Creo restricciones por campo

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()

// Creando esquema para la creación, el cual reune todos los campos con sus respectivas restricciones
const createProductoSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image : image.required()
})

const updateProductSchema = Joi.object({
  name:name,
  price: price,
  image:image
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = {createProductoSchema,updateProductSchema,getProductSchema}
