const Order = require('../models/orderModel');

// Obter todos os pedidos
async function getAllOrders(req, res) {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
}

// Obter pedido por ID
async function getOrderById(req, res) {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar o pedido' });
    }
}

// Criar novo pedido
async function createOrder(req, res) {
    try {
        const { customerName, productId, quantity, status } = req.body;
        const newOrder = await Order.create({ customerName, productId, quantity, status });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar pedido' });
    }
}

// Atualizar status de um pedido
async function updateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        order.status = status;
        await order.save();
        res.json({ message: 'Status atualizado com sucesso', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o status do pedido' });
    }
}

// Deletar um pedido
async function deleteOrder(req, res) {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        await order.destroy();
        res.json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o pedido' });
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder
};
