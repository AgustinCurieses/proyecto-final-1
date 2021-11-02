const Contenedor = require('../../Contenedor');

const cartContenedor = new Contenedor('./data/carts.json');
const productContenedor = new Contenedor('./data/products.json');

const createCart = async (cart) => {
  const idCartSaved = await cartContenedor.saveCart(cart);
  return idCartSaved;
};

const deleteCart = async (idCart) => {
  await cartContenedor.deleteById(idCart);
  return idCart;
};

const getProductsByIdCard = async (id) => {
  const cart = await cartContenedor.getById(id);
  const products = cart;

  return products;
};

const addProductsToCart = async (id) =>  {
  const productId = await productContenedor.getById(id)
  const productAdded = await cartContenedor.saveProductToCart(productId);
  return productAdded;
};

const deleteProductToCart = async (id, idProduct) =>  {
  const cart = await cartContenedor.deleteByIdToCart(id, idProduct);
};



module.exports = {
  createCart,
  deleteCart,
  getProductsByIdCard,
  addProductsToCart,
  deleteProductToCart
};