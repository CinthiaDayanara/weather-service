const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3014;

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
}));

app.use(express.json());

app.get('/weather', async (req, res) => {
  try {
    const { lat, lon, exclude } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Se requieren latitud y longitud' });
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;


    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error al obtener datos del clima' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});