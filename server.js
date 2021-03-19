const express = require('express') 
const multer = require('multer')
const app = express()
const port = 8080
const router = express.Router()

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage })

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let error = {}
let products = [
    {
        title: 'Product 1',
        price: '122.99',
        thumbnail: 'foto-1.png',
        id: 1
    },
    {
        title: 'Product 2',
        price: '78.99',
        thumbnail: 'foto-2.png',
        id: 2
    },
    {
        title: 'Product 3',
        price: '256.99',
        thumbnail: 'foto-3.png',
        id: 3
    }
]
let product = {
    title: '',
    price: '',
    thumbnail: ''
};

// Form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// Get products
router.get('/productos/listar', (req, res) => {
    if (products.length === 0) {
        error = {
            error: 'no hay productos cargados'
        }
        return res.json(error);
    }
    res.json(products)
})

// Get product by id
router.get('/productos/listar/:id', (req, res) => {
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
router.post('/productos/guardar', upload.single('thumbnail'), (req, res, next) => {
    const file = req.file
    if(!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    if(req.body.title && req.body.price && file) {
        product = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: file.originalname,
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

// Update product
router.put('/productos/actualizar/:id', (req, res) => {
    const productId = parseFloat(req.params.id)

    if(req.body.title && req.body.price && req.body.thumbnail) {
        products = products.map(product => 
            product.id === productId ?
            { 
                ...product, 
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail
            } : product
        )
        var productUpdate = products.filter(product => product.id === productId)
        if (productUpdate.length === 0) {
            error = {
                error: 'producto no encontrado'
            }
            return res.json(error);
        }
    } else {
        error = {
            error: 'todos los campos son obligatorios'
        }
        return res.json(error);
    }
    res.send(productUpdate);
})

// Delete product
router.delete('/productos/actualizar/:id', (req, res) => {
    const productId = parseFloat(req.params.id)
    const productItem = products.findIndex(({ id }) => id === productId);
    if (productItem >= 0) {
        products.splice(productItem, 1);
    } else {
        error = {
            error: 'producto no encontrado'
        }
        return res.json(error);
    }
    res.json(products)
})

app.use('/api', router)

const server = app.listen(port, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))