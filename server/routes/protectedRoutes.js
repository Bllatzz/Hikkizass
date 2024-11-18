const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
} = require('../controllers/productController');
const { authMiddleware, authorizeAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, authorizeAdmin, upload.single('image'), createProduct);
router.put('/:id', authMiddleware, authorizeAdmin, updateProduct);
router.delete('/:id', authMiddleware, authorizeAdmin, deleteProduct);

module.exports = router;