// 1. Configuración de Módulos (CommonJS) y Variables de Entorno
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); 

// Importación de las Rutas 
const resenasRoutes = require('./routes/resenas');
const juegosRoutes = require('./routes/juegos'); 

// --- ¡LA LÍNEA CORREGIDA ESTÁ AQUÍ! ---
// Usa tu nuevo cluster, tu usuario, tu contraseña, y el nombre de la DB (ELKINCRUZ1)
const MONGO_URI_DEFAULT = "mongodb+srv://kinscruz833_db_user:kinscruz833@cluster0.ooosbzy.mongodb.net/ELKINCRUZ1?appName=Cluster0"; 
// --- ---

const app = express();

// 2. Middleware
app.use(cors()); 
app.use(express.json());

// 3. Rutas Activas (Prefijadas con /api)
app.use('/api/juegos', juegosRoutes); 
app.use('/api/resenas', resenasRoutes);

// 4. Conexión a MongoDB
const connectDB = async () => {
    try {
        // Usamos la variable de entorno (si existe) o la que definimos arriba
        await mongoose.connect(process.env.MONGO_URI || MONGO_URI_DEFAULT);
        console.log('✅ MongoDB Atlas conectado exitosamente.');
    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error.message);
        process.exit(1);
    }
};

// Rutas de prueba
app.get("/", (req, res) => {
    res.send("Bienvenido a GameTracker API");
});

const PORT = process.env.PORT || 4000; 

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error("Error al iniciar el servidor después de la conexión a la DB:", error);
});