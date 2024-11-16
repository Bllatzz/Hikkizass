const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const slugify = require('slugify');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    continente: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    league: {
        type: DataTypes.STRING,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
    },
});

Product.beforeSave((product) => {
    if (!product.slug || product.changed('name')) {
        product.slug = slugify(product.name, { lower: true, strict: true });
    }
});

module.exports = Product;