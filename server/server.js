const path = require('path');
const express = require("express");
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/views/public')));

// Routes 
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

// HTTP Requests
app.use('/productos', productsRoutes);
app.use('/carrito', cartRoutes);

// Server 
const server = http.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})
server.on('error', error => console.log(`Error: ${error}`))