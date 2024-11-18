const express = require('express');
const {
    getAllProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    upload,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/slug/:slug', getProductBySlug);
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
