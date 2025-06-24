import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

//Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3200;
const app = express();

app.use(express.json());

//Rutas
app.use('/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

