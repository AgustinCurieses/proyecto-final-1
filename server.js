const express = require('express');
const cartRouter = require('./src/routers/cart');
const productRouter = require('./src/routers/product');
const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );

app.get('/', (req,res) => res.send({ data: Date.now() }))

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => 
  console.log(`Servidor abierto en http://localhost:${PORT}/`)
);

app.use((req, res) =>{
  res.status(404);
  if (req.accepts('json')) { 
    res
      .status(404)
      .json({ error : "-2  ",
        descripcion: `  ruta ${req.path} método ${req.method} no implementada`})}

});