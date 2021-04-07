const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 8080
const router = express.Router()
const handlebars  = require('express-handlebars')
const fs = require('fs');

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs')
app.set('views', './views')
//app.set(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


interface Product {
  title: string,
  price: string,
  thumbnailUrl: string,
  id: number,
}
interface Message {
  email: string, 
  timestamp: string, 
  text: string, 
}

let error = {}

const getProducts = () => {
    return [
        {
            title: 'Banana',
            price: '12.99',
            thumbnailUrl: 'https://cdn2.iconfinder.com/data/icons/fruits-66/50/Fruits_Outline-10-128.png',
            id: 1
        },
        {
            title: 'Apple',
            price: '8.99',
            thumbnailUrl: 'https://cdn2.iconfinder.com/data/icons/fruits-66/50/Fruits_Outline-12-128.png',
            id: 2
        },
        {
            title: 'Orange',
            price: '16.99',
            thumbnailUrl: 'https://cdn2.iconfinder.com/data/icons/fruits-66/50/Fruits_Outline-09-128.png',
            id: 3
        }
    ];
}

let products = getProducts();

let messages: Array<Message> = []

let product: Product = {
    title: '',
    price: '',
    thumbnailUrl: '',
    id: 0,
};

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
router.post('/productos/guardar', (req, res) => {
    if(req.body.title && req.body.price && req.body.thumbnailUrl) {
        product = {
            title: req.body.title,
            price: req.body.price,
            thumbnailUrl: req.body.thumbnailUrl,
            id: products.length + 1
        };
        products.push(product)
    } else {
        error = {
            error: 'todos los campos son obligatorios'
        }
        return res.json(error);
    }
    res.render('index', {products: products, productsExists: true});
})

// Update product
router.put('/productos/actualizar/:id', (req, res) => {
    const productId = parseFloat(req.params.id)

    if(req.body.title && req.body.price && req.body.thumbnailUrl) {
        products = products.map(product => 
            product.id === productId ?
            { 
                ...product, 
                title: req.body.title,
                price: req.body.price,
                thumbnailUrl: req.body.thumbnailUrl
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
router.delete('/productos/borrar/:id', (req, res) => {
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

// Index
app.get('/', (req, res) => {
    res.render('index', {products: products, productsExists: true});
})

app.use('/api', router)

io.on('connection', (socket) => {
    // New product
    socket.on('new product', (product: Product) => {
		io.emit('new product', product);
    let newProduct: Product;
		newProduct = {
			title: product.title,
			price: product.price,
			thumbnailUrl: product.thumbnailUrl,
			id: products.length + 1
		};
		products.push(newProduct)
		console.log(newProduct);
    });

	// New message
	socket.on('new message', async (message) => {
		io.emit('new message', message);
    let newMessage: Message;
		newMessage = {
			email: message.email, 
			timestamp: message.timestamp, 
			text: message.text, 
		};
		messages.push(newMessage)
		console.log(newMessage);
		try {
			await fs.promises.writeFile('messages.txt', JSON.stringify(messages))
		} catch(err) {
			console.log('Error de escritura', err.errno)
		}
	});
})

const server = http.listen(port, () => {
    console.log(`Servidor inicializado en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))