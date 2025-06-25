import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import sequelize from './config/database.js';
import './Models/User.js';
import './Models/Book.js';

//Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3200;
const app = express();

app.use(express.json());

//Sincronizar tablas DB;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');
    
    // usa force: true solo para borrar y regrear
    await sequelize.sync({ alter: true }); 
    console.log('✅ Modelos sincronizados con la base de datos.');


  } catch (err) {
    console.error('❌ Error al conectar o sincronizar:', err);
  }
};
//start();

//Rutas
app.use('/api/auth',authRoutes);
app.use('/api/book',bookRoutes);
app.use('/api/admin',adminRoutes);


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto 3000');
  });
}

export default app;
