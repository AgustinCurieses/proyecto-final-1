const Contenedor = require('../../Contenedor');

const productsContenedor = new Contenedor('./data/products.json');

const getProduct = async (id) => {
  const product = await productsContenedor.getById(id);
  return product;
};

const getAllProducts = async () => {
  const list = await productsContenedor.getAll();
  return list;
};

const createProduct = async (product) => {
  const idProductSaved = await productsContenedor.save(product);
  return idProductSaved;
};

const updateProduct = async (id,product) => {
  const productUpdated = await productsContenedor.update(id, product);
  return productUpdated;
};

const deleteProduct = async (id) => {
  const productDeleted = await productsContenedor.getById(id);
  await productsContenedor.deleteById(Number(id));
  return productDeleted;
};

module.exports = {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};