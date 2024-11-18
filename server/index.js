const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
