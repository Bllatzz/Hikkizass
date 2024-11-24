const Product = require('../models/productModel');
const { Op, Sequelize } = require('sequelize');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');
const Category = require('../models/categoryModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, ""); 
      cb(null, uniqueSuffix + "-" + sanitizedFilename); 
    },
  });
  
  const upload = multer({ storage });
async function generateUniqueSlug(name) {
    let baseSlug = slugify(name, { lower: true });
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await Product.findOne({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
}

function buildWhereClause(query) {
    const where = {};

    if (query.name) {
        where.name = Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("name")), 
            "LIKE",
            `%${query.name.toLowerCase()}%` 
        );
    }

    if (query.category) {
        where.category = query.category;
    }

    return where;
}


async function getAllProducts(req, res) {
    try {
        const { name } = req.query;

        const whereClause = name
            ? {
                  name: {
                      [Sequelize.Op.like]: `%${name.toLowerCase()}%`, 
                  },
              }
            : {};

        const products = await Product.findAll({
            where: whereClause,
            attributes: [
                'id',
                'name',
                'price',
                'description',
                'image',
                'quantity',
                'continente',
                'country',
                'league',
                'slug',
                'createdAt',
                'updatedAt',
            ],
        });

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
        const { name, description, price, quantity, category, continente, country, league } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const slug = await generateUniqueSlug(name);

        const product = await Product.create({
            name,
            description,
            price,
            quantity,
            category,
            continente,
            country,
            league,
            image,
            slug,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o produto.' });
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

        let slug = product.slug;
        if (name !== product.name) {
            slug = await generateUniqueSlug(name);
        }

        const updatedData = {
            name,
            price,
            description,
            quantity,
            continente,
            country,
            league,
            slug,
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
