const express = require('express');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductBySlug } = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/slug/:slug', getProductBySlug);
module.exports = router;