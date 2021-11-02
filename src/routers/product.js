const express = require('express');
const isAdmin = require('../middlewares/isAdmin');
const {getProduct, getAllProducts, createProduct, updateProduct, deleteProduct } = require('../models/product');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const data = await getAllProducts();
  res.send({ data });
});

productRouter.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const data = await getProduct(productId);
  res.send({ data });
});

productRouter.post('/', isAdmin, async (req, res) => {
  const newProduct = req.body;
  const idProductsaved = await createProduct(newProduct);
  res.send({ data: idProductsaved });
});

productRouter.put('/:id', isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  const productUpdated = await updateProduct(productId, product);
      if (!productUpdated) {
          res.send({
              message: 'producto no encontrado',
          });
      } else {
          res.send({
              message: 'producto actualizado',
              data: productUpdated
      });
  }
});

productRouter.delete('/:id',isAdmin, async (req, res) => {
  const productId = req.params.id;
  const productDeleted = deleteProduct(productId)
  res.send({
      message: 'se borro correctamente',
      data: productDeleted
  }) 
});


module.exports = productRouter;

