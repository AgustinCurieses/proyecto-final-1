const express = require('express');
const { createCart, deleteCart, addProductsToCart, getProductsByIdCard, deleteProductToCart } = require('../models/cart');

const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
  const cart = req.body;
  const idCartSaved = await createCart(cart);
  res.send({ data: idCartSaved });
});

cartRouter.delete('/:id', async (req, res) => {
  const cart = req.params.id;
  const idCartDeleted = await deleteCart(Number(cart));
  res.send({ data: idCartDeleted });
});

cartRouter.get('/:id/productos', async (req, res) => {
  const cartId = req.params.id;
  const list = await getProductsByIdCard(Number(cartId));
  res.send({ data: list });
});

cartRouter.post('/:id/productos', async (req, res) => {
  const cartId = req.params.id;
  const cart = await addProductsToCart(cartId);
  res.send({ data: cart });
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  const cartId = req.params.id;
  const productId = req.params.id_prod;
  const cart = await deleteProductToCart(cartId, productId);
  res.send({ data: cart });
});

module.exports = cartRouter;

