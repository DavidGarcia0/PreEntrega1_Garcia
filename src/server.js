const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Productos y Carritos. Usa /api/products o /api/carts.');
});

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});
