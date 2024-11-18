const { Sequelize } = require('sequelize');
require('dotenv').config();
const dialect = process.env.DB_DIALECT;
const storage = process.env.DB_STORAGE;
const logging = process.env.DB_LOGGING;


const sequelize = new Sequelize({
    dialect: dialect,
    storage: storage,
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso!');
        await sequelize.sync({ alter: true }); 
    } catch (error) {
        console.error('Erro ao conectar no banco de dados:', error);
    }
})();

module.exports = sequelize;
