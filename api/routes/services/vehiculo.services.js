const faker = require('faker')
const boom = require('@hapi/boom')

class VehiculoService{
  constructor(){
    this.vehiculos = []
    this.generate()
  }

  generate(){
    for(let i=0; i<10 ; i++){
        this.vehiculos.push({
        matricula:faker.vehicle.vrm(),
        combustible:faker.vehicle.fuel(),
        fabricante:faker.vehicle.manufacturer(),
        modelo:faker.vehicle.model(),
        tipo:faker.vehicle.type(),
        vehiculo:faker.vehicle.vehicle()
      })
    }

  }
  find(){
    return this.vehiculos
  }
  findOne(matricula){
    const index = this.vehiculos.findIndex(item => item.matricula === matricula)

    if(index === -1){
      throw boom.notFound('Vehiculo not found')
    }
    return this.vehiculos[index]
  }
  create(data){
    const newVehiculo = {
      matricula:faker.vehicle.vrm(),
      ...data //concateno los valores que vienen en la data
    }
    this.vehiculos.push(newVehiculo)
    return this.vehiculos

  }

  update(matricula,changes){
    const index = this.vehiculos.findIndex(item => item.matricula === matricula)

    if (index === -1){
      throw boom.notFound('Vehiculo not found')
    }
      const vehiculo = this.vehiculos[index]
      this.vehiculos[index] = {
        ...vehiculo,
        ...changes
      }
      return this.vehiculos[index]

  }

  delete(matricula){
    const index = this.vehiculos.findIndex(item => item.matricula === matricula)
    if(index === -1){
      throw boom.notFound('Vehiculo not found')
    }
    this.vehiculos.splice(index,1)
    return {matricula}
  }

}

module.exports = VehiculoService
