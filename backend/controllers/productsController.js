// controllers/productsController.js
const Product = require('../models/products');

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addProduct: async (req, res) => {
    const newProduct = req.body;
    const { name } = newProduct;
  
    try {
      // Check if a product with the same name already exists
      const existingProduct = await Product.findOne({ name });
  
      if (existingProduct) {
        return res.status(400).json({ error: 'Product with the same name already exists' });
      }
  
      // If no product with the same name exists, add the new product
      const addedProduct = await Product.create(newProduct);
      res.status(201).json(addedProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    try {
      const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(productId);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = productsController;
