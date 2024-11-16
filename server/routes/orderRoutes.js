const express = require('express');
const { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllOrders); // Obter todos os pedidos
router.get('/:id', getOrderById); // Obter um pedido por ID
router.post('/', createOrder); // Criar um novo pedido
router.put('/:id', updateOrderStatus); // Atualizar o status de um pedido
router.delete('/:id', deleteOrder); // Deletar um pedido

module.exports = router;
