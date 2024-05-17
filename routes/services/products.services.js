const faker = require('faker'); // Importo librería faker
const boom = require('@hapi/boom'); // Importo libreria boom
const { fa } = require('faker/lib/locales');

class ProductsService {
  constructor() {
    this.products = [];
       const limit = 1000;
    this.generate(limit);
  }

  generate(limit) {
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
     const product = this.products.push({
        id:faker.datatype.uuid(),
        ...data,
        isBlock:faker.datatype.boolean()
        })

      return product

  }



   find(limit) {
    const product= new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve(this.products)
      }, 1000);
    })

    if(!product){
      throw boom.badRequest('Solicitud incorrecta')
    }
    return product

  }

  async findOne(id) {
    //const name = this.getTotal()
    const product = this.products.find((item) => item.id === id);
    if(!product){
      throw boom.notFound('Product not found')
    }
    if(product.isBlock){
      throw boom.conflict('Product is block')
    }
    return product
  }

  async update(id,change) {

      const index = this.products.findIndex((item)=>{
        return item.id === id
      })

      if(index === -1){
        throw boom.notFound('Product no found')

      }

      const product = this.products[index]
      this.products[index]= {
        ...product,
        ...change
      }
      return this.products[index]

 }



  delete(id) {
    const index = this.products.findIndex(item => item.id === id)

    if(index === -1){
      throw boom.notFound('Product not found')
    }
    return this.products.splice(index,1)
  }

}

module.exports = ProductsService;




