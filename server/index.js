// 1. IMPORTS & CONSTANTS
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = 3002;

// 2. MIDDLEWARES
require('dotenv').config()

// a) EXPRESS con BodyParser
app.use(express.urlencoded({extended:true})) // For parsing
app.use(express.json()); // For application/json
app.use(cors());

// b) Mongoose <> MongoDB
mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`, {useNewUrlParser: true})

// 3. MODELS
const { Restaurante } = require('./models/restaurante')

// 4. ROUTES

app.get('/restaurantes', async (req,res, next) => {
    const restaurantes = await Restaurante.find({})
    res.status(200).send(restaurantes);
})

app.get('/:idRestaurante', async (req,res, next) => {
    const currentId = await req.params.idRestaurante
    const restaurante = await Restaurante.find({id: currentId})
    res.status(200).send(restaurante)
})

// 5. LISTENER
app.listen(port, () => {
    console.log(`Estamos conectados en el puerto ${port}`)
})

