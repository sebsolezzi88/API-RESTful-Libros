import express from 'express';
import dotenv from 'dotenv';

//Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3200;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

