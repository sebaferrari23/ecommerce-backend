const { options } = require('../options/mariaDB.js');
const knex = require('knex')(options);
const { requiredData, checkFields } = require('../validators/products');
const productKeys = ['title', 'description', 'code', 'thumbnail', 'price', 'stock'];

const model = {

  createTable: async () => {
    try {
      await knex.schema.createTable('productos', function (table) {
        table.increments('id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.string('title')
        table.string('description')
        table.integer('code')
        table.string('thumbnail')
        table.decimal('price', 8,2)
        table.integer('stock')
      });
      console.log('MariaDB lista');
    } catch (err) {
      if (err.errno === 1050) return console.log('MariaDB lista');
      console.log(err.message);
    }
  },

  getAllProducts: async () => {
    try {
      const products = await knex.from('productos').select('*');
      if (!products.length) throw new Error('No se encontraron productos');
      return products;
    } catch (err) {
      throw err;
    }
  },

  getProduct: async (productId) => {
    try {
      const product = await knex.from('productos').select('*').where('id', productId);
      if (!product[0]) throw new Error('Producto inexistente.');
      return product[0];
    } catch (err) {
      throw err;
    }
  },

  addProduct: async (productItem) => {
    try {
      const validProduct = requiredData(productItem, productKeys);
      if (!validProduct) {
        throw new Error(
          'Los datos para el producto son insuficientes.'
        );
      }
      const productId = await knex('productos').insert(productItem);
      const product = await knex
        .from('productos')
        .select('*')
        .where('id', productId);
      console.log(product);
      return product;
    } catch (err) {
      throw err;
    }
  },

  updateProduct: async (productId, productItem) => {
    try {
      const validProduct = checkFields(productItem, productKeys);
      await knex.from('productos').where('id', productId).update(validProduct);
      const product = await knex.from('productos').select('*').where('id', productId);
      return product;
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const productDeleted = await knex.from('productos').where('id', productId).del();
      if (productDeleted === 0) throw new Error('Producto no encontrado.');
      return productDeleted;
    } catch (err) {
      throw err;
    }
  }

}

module.exports = model;