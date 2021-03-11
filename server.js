import express from 'express'
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let error = {}
let products = []
let product = {
    title: '',
    price: '',
    thumbnail: ''
};

// Get products
app.get('/api/productos/listar', (req, res) => {
    if (products.length === 0) {
        error = {
            error: 'no hay productos cargados'
        }
        return res.json(error);
    }
    res.json(products)
})

// Get product by id
app.get('/api/productos/listar/:id', (req, res) => {
    const productId = parseFloat(req.params.id)
    const product = products.filter(product => product.id === productId)
    if (product.length === 0) {
        error = {
            error: 'producto no encontrado'
        }
        return res.json(error);
    }
    res.json(product)
})

// Save product
app.post('/api/productos/guardar', (req, res) => {
    if(req.body.title && req.body.price && req.body.thumbnail) {
        product = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            id: products.length + 1
        };
        products.push(product)
    } else {
        error = {
            error: 'todos los campos son obligatorios'
        }
        return res.json(error);
    }
    res.send(product);
})

const server = app.listen(port, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))