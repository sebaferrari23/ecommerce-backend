const path = require('path');
const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { options } = require('./options/SQLite3');
const knex = require('knex')(options);
const port = process.env.PORT || 8080;
const cors = require('cors');
const products = require('./models/products');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/views/public')));

// Routes 
const productsRoutes = require('./routes/products');

// HTTP Requests
app.use('/productos', productsRoutes);

// Messages
io.on('connection', (socket) => {
  socket.on('getChatMessages', async () => {
    try {
      const messages = await knex.from('messages').select('*');
      if(!messages.length) throw new Error('ENOENT');
      io.emit('messages', messages);
    } catch (err) {
      if (err.message === 'ENOENT')
        return io.emit('chatInfo', { info: 'No se encontraron mensajes' });
      io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
    }
  });
  socket.on('setNewChatMessages', async (message) => {
    try {
      const data = await knex.from('messages').select('*');
      let messages = [];
      if(!!data.length) messages = data;
      const messageWithDate = {
        ...message,
        date: new Date().toLocaleString('es-AR'),
      };
      await knex('messages').insert(messageWithDate);
      messages.push(messageWithDate);
      io.emit('messages', messages);
    } catch (err) {
      io.emit('chatInfo', { error: 'No fue posible recuperar los mensajes' });
    }
  });
});

// Server 
const server = http.listen(port, async () => {
  try {
    console.log(`Listening on port ${server.address().port}`);
    await products.createTable();
    await knex.schema.createTable('messages', function (table) {
      table.increments('id')
      table.string('text')
      table.string('email')
      table.timestamp('created_at')
    });
    console.log('SQLite DB lista');
  } catch (err) {
    if (err.errno === 1) return console.log('SQLite DB lista');
    console.log(err)
  }
})
server.on('error', error => console.log(`Error: ${error}`))