const fs = require('fs');

class Contenedor {
  constructor(file) {
    this.file = file;
  }
  
  async save(product) {
    try {
      const content = await fs.promises.readFile(`./${this.file}`, 'utf-8');
  
      let products = [];
      if (content === '') {
        product.id = 1;
        product.timestamp = Date.now();
        products.push(product);
      } else {
        const productsList = JSON.parse(content);
    
        product.id = productsList[productsList.length - 1].id + 1;
        product.timestamp = Date.now();
        productsList.push(product);
        products = productsList;
      }
  
      const productsString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productsString);

      return product.id; 
    } catch (error) {
      console.error('Error:', error);
    };
  };

  async saveProductToCart(product) {
    try {
      const content = await fs.promises.readFile(`./${this.file}`, 'utf-8');

        const productsList = JSON.parse(content);
        productsList[productsList.id-1].producto.push(product);
        const productos = productsList;
      
  
      const productsString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productsString);

      return product.id; 
    } catch (error) {
      console.error('Error:', error);
    };
  };

  async saveCart(product) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
  
      let products = [];
      if (contenido === '') {
        console.log('anda')
        product.id = 1;
        product.timestamp = Date.now();
        product.producto = [];
        products.push(product);
      } else {
        const listaDeProducto = JSON.parse(contenido);
    
        product.id = listaDeProducto[listaDeProducto.length - 1].id + 1;
        product.timestamp = Date.now();
        product.producto = [];
        listaDeProducto.push(product);
        products = listaDeProducto;
      }
  
      const productsString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productsString);

      return producto.id; 
    } catch (error) {
      console.error('Error:', error);
    };
  };

  async getById(id) {
    try {
  
        const content = await fs.promises.readFile(`./${this.file}`, 'utf-8');
        const productsList = JSON.parse(content);
        if (productsList === '') {
          return null;
        } else {
          const productFound = productsList.find(item => item.id === parseInt(id));
          return productFound;
        }
    }catch (error) {
        console.error('Error:', error);
    };
  }
  async getAll() {
    try {
      const content = await fs.promises.readFile(`./${this.file}`, 'utf-8');
      const productsList = JSON.parse(content);
      if (!productsList === '') {
        console.log("test")
      } else {
        return productsList;
      }
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async deleteById(productId){
    try {
        const content = await fs.promises.readFile(`./${this.file}`, 'utf-8');
        const productsList = JSON.parse(content);
        let i;
        for (i=0 ; i<=productsList.length ; i++){
            if (productsList[i].id===productId) {
              productsList.splice((i),1);
                const productsString = JSON.stringify(productsList, null, 2);
                return (await fs.promises.writeFile(`./${this.file}`, productsString));
            }
        }
    } catch (error) {
        console.error('Error: el objeto que busca eliminar no existe', error);
    };
  }

  async deleteByIdToCart(cartId, productId){
    try {
        const content = await fs.promises.readFile(`./${this.file}`, 'utf-8');
        const productsList = JSON.parse(content);
        const cartSelected = productsList.find((item) => item.id === parseInt(cartId));
        let i;
        for (i=0 ; i<=cartSelected.producto.length ; i++){
                    if (cartSelected.producto[i].id===Number(productId)) {
                      cartSelected.producto.splice((i),1);
                        const productsString = JSON.stringify(cartSelected, null, 2);
                        return (await fs.promises.writeFile(`./${this.file}`, productsString));
                    }
                }
            } catch (error) {
        console.error('Error: el objeto que busca eliminar no existe', error);
    };
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.file}`, '');
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async update(id, element) {
    const list = await this.getAll();
    console.log({list})
    console.log({id})

    const elementSaved = list.find((item) => item.id === parseInt(id));
    const indexElementSaved = list.findIndex((item) => item.id === parseInt(id));
    console.log({elementSaved})
    if (!elementSaved) {
      console.error(`Elemento con el id: '${id}' no fue encontrado`);
      return null;
    }

    const elementUpdated = {
      ...elementSaved,
      ...element
    };

    list[indexElementSaved] = elementUpdated;

    const elementsString = JSON.stringify(list, null, 2);
    await fs.promises.writeFile(`./${this.file}`, elementsString);

    return elementUpdated;
  }
}

module.exports = Contenedor;