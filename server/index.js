const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db/connection'); 
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const initializeCategories = require('./utils/initializeCategories'); 
const initializeAdmin = require('./utils/initializeAdmin'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

sequelize.sync().then(async () => {
    console.log('Banco de dados sincronizado.');
    await initializeCategories(); 
    await initializeAdmin();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
});
