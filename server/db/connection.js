const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar no banco de dados:', error);
    }
})();

module.exports = sequelize;
