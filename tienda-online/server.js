const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Middleware para parsear JSON y datos URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// se configura la sesión
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Conectar a la base de datos MongoDB jsjsj mongolo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Iniciar el servidor en el puerto especificado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

