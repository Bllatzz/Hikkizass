const Product = require('../models/productModel');
const { Op } = require('sequelize');

// Obter todos os produtos
async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
}



// Obter produto por ID (mantido para compatibilidade)
async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar o produto' });
    }
}

// Criar novo produto
async function createProduct(req, res) {
    try {
        const { name, price, description, image, quantity, continente, country, league } = req.body;

        // Cria o produto com o slug gerado automaticamente
        const newProduct = await Product.create({ name, price, description, image, quantity, continente, country, league });

        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar produto' });
    }
}

// Atualizar produto
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, price, description, image, quantity, continente, country, league } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Atualiza o produto (slug será atualizado automaticamente pelo hook)
        await product.update({ name, price, description, image, quantity, continente, country, league });

        res.json({ message: 'Produto atualizado com sucesso', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o produto' });
    }
}

// Deletar produto
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        await product.destroy();
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o produto' });
    }
}

// Buscar produtos
async function searchProducts(req, res) {
    try {
        const searchTerm = req.query.q;
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
}
async function getProductBySlug(req, res) {
    try {
        const { slug } = req.params; 
        const product = await Product.findOne({ where: { slug } }); 
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar o produto' });
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductBySlug
};