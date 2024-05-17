const faker = require('faker')
const boom = require('@hapi/boom')

class AnimalService{
  constructor(){
    this.animals = []
    this.generate()

  }

  generate(){
    for(let i = 0;i<10 ; i++){
      this.animals.push({
        id:faker.datatype.uuid(),
        gato:faker.animal.cat(),
        perro:faker.animal.dog(),
        ave:faker.animal.bird(),
        isBlock: faker.datatype.boolean(),
      })
    }

  }

  find(){

    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.animals)
      }, 1000);
    })
  }

  findOne(id){
    const index= this.animals.findIndex(item => item.id === id)

    if(index === -1){
      throw new Error('Not found')
    }
    return this.animals[index]

  }

  create(data){
    const animal = {
      id:faker.datatype.uuid(),
      ...data,
      isBlock:faker.datatype.boolean()
    }
    this.animals.push(animal)
    return animal
  }

  update(id,changes){
    const index = this.animals.findIndex((item)=>{
      return item.id === id
    })
    if(index === -1){
      throw boom.notFound('Animal not found')
    }

    const animal = this.animals[index]
    this.animals[index] = {
      ...animal,
      ...changes
    }

    return this.animals[index]
  }

  delete(id){
    const index = this.animals.findIndex(items => items.id ===id)

    if(index === -1){
      throw boom.notFound('Animal not found')
    }
    return this.animals.splice(index,1)
  }
}

module.exports = AnimalService
