const Joi = require('joi')

const matricula = Joi.string().min(3)
const combustible = Joi.string().min(3)
const fabricante = Joi.string().min(3)
const tipo = Joi.string().min(3)
const modelo = Joi.string().min(3)
const vehiculo = Joi.string().min(3)

const createVehiculoSchema =  Joi.object({
  combustible:combustible.required(),
  fabricante:fabricante.required(),
  tipo:tipo.required(),
  modelo:modelo.required(),
  vehiculo:vehiculo.required()
})

const updateVehiculoSchema = Joi.object({
  combustible:combustible,
  fabricante:fabricante,
  tipo:tipo,
  modelo:modelo,
  vehiculo
})

const deleteVehiculoSchema = Joi.object({
  matricula:matricula.required()
})

const getVehiculoSchema = Joi.object({
  matricula:matricula.required()
})

module.exports={createVehiculoSchema,updateVehiculoSchema,deleteVehiculoSchema,getVehiculoSchema}
