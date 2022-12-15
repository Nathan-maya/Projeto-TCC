const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const missingRoute = require('./routes/missing')
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('conectado ao mongodb'))
  .catch((err) => {
    console.log('erro inesperado: ' + err);
  });

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/missing',missingRoute)

app.get('/', (req, res, next) => {
  res.send('ola');
  next();
});

const hostname = '192.168.68.115';
const PORT = process.env.PORT || 8080;
app.listen(PORT, hostname, () => {
  console.log(`Servidor rodando em: http://${hostname}:${PORT}`);
});
