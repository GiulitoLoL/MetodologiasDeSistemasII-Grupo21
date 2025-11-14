import express, { Application } from 'express';
import productRoutes from './routes/productRoutes'; 

const app: Application = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenido a la API de Productos!' });
});

app.use('/api/products', productRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`🚀 Servidor Express escuchando en http://localhost:${port}/api`));