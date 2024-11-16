const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/db.sqlite',
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
