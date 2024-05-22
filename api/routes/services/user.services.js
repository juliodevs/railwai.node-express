
const { fa, th } = require('@faker-js/faker')
const faker = require('faker'); // Importo librería faker
const boom = require('@hapi/boom')
class userServices{
  constructor(){
    this.users = []

    this.generate()

  }

  generate(){
    for(let i=0;i<10;i++){
      this.users.push({
        id:faker.datatype.uuid(),
        name:faker.internet.userName(),
        email:faker.internet.email(),
        avatar:faker.internet.avatar(),
        password:faker.internet.password()
      })
    }
  }

  create(data){

    const user = this.users.push({
      id:faker.datatype.uuid(),
      ...data
    })

    return user

  }
  find(){
    return this.users
  }

  findOne(id){
    const index = this.users.findIndex((item)=> item.id === id)
    if(index === -1){
      throw boom.notFound('User not found')
    }
    return this.users[index]
  }

  update(id,changes){

    const index = this.users.findIndex((item)=> item.id === id)
    if(index === -1){
      throw boom.notFound('User not found')
    }

    const user = this.users[index]

    this.users[index] = {
      ...user,
      ...changes
    }

    return this.users[index]
  }

  delete(id){
    const index = this.users.findIndex((item) =>{
      return item.id === id
    })

    if(index === -1){
      throw boom.notFound('User not found')
    }

    return this.users.splice(index,1)
  }

}

module.exports = userServices
