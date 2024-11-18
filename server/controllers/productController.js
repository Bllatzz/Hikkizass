const Product = require('../models/productModel');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
}

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

async function createProduct(req, res) {
    try {
        const { name, price, description, quantity, continente, country, league } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = await Product.create({
            name,
            price,
            description,
            image,
            quantity,
            continente,
            country,
            league,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar produto' });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, price, description, quantity, continente, country, league } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const updatedData = {
            name,
            price,
            description,
            quantity,
            continente,
            country,
            league,
        };

        if (image) {
            updatedData.image = image;
        }

        await product.update(updatedData);

        res.json({ message: 'Produto atualizado com sucesso', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o produto' });
    }
} 

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

module.exports = {
    getAllProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    upload,
};