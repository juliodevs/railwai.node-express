
const express = require('express');
const ProductsService = require('./services/products.services');
const validatorHandler = require('./../middlewares/validator.handler')
const {createProductoSchema,updateProductSchema,getProductSchema} = require('./../middlewares/schema/product.schema')



const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res,next) => {
      try {
        const { limit } = req.query;
          const products = await service.find(limit || 10);
          res.json({
            size: products.length,
            products,
          });
      } catch (error) {
        next(error)
      }

});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
    validatorHandler(getProductSchema,'params'),
      async (req, res,next) => {
          try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.status(200).json(product);
          } catch (error) {
            next(error)
          }

        });


 //endPoint que recibe dos parametros
router.get('/',  (req,res)=>{
  const {categoriesId,productsId} = req.params
    res.json([
      {
        categoriesId,
        productsId
      }
    ])
})


// Metodo post

router.post('/',
  validatorHandler(createProductoSchema,'body'),
  async (req,res,next)=>{
    try {
      const data = req.body
      const product = await service.create(data)
      res.status(201).json({
        message:"created",
        product
      })

    } catch (error) {
      next(error)
   }

})

// Metodo PATCH

router.patch('/:id',
 validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
    async (req,res,next)=>{
    try {
      const id = req.params.id
      const body = req.body
      const product = await service.update(id,body)

        res.status(200).json({
          message: "Updated",
          product
        })
    } catch (error) {
      next(error)
    }
})

// Metodo DELETE

router.delete('/:id', async (req,res)=>{
  try {
    const {id} = req.params
    const product = await service.delete(id)
    res.status(200).json({
      message:"Delete",
      id
    })
  } catch (error) {
    next(error)
  }

})

module.exports = router
