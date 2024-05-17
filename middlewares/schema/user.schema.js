const Joi = require('joi') // Importo libreria JOI

// Creo restricciones de los campos

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(15).message({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
  'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
  'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
})
const email = Joi.string().email()
const password = Joi.string().min(10)



// Creando esquema de restricciones para la creación de usuarios

const createUserSchema = Joi.object({
  name: name.required(),
  email:email.required(),
  password:password.required()
})

// Creando esquema de restricciones para la actualizacion de usuarios

const updateUserSchema = Joi.object({
  name:name,
  email:email,
  password:password
})

// Creando esquema de restricciones para la eliminación de usuarios
const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = {createUserSchema,updateUserSchema,getUserSchema}
