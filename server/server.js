// 1. IMPORTS & CONSTANTS
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express();
const port = 3002;

// 2. MIDDLEWARES
require('dotenv').config()

// a) EXPRESS con BodyParser
app.use(express.urlencoded({extended:true})) // For parsing
app.use(express.json()); // For application/json
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


// b) Mongoose <> MongoDB
mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`, {useNewUrlParser: true, useCreateIndex: true})

// 3. MODELS
const { Restaurante } = require('./models/restaurante')
const  { User } = require('./models/user')


// 4. ROUTES

///////////////////////////////////////////////
//                  USERS                    
///////////////////////////////////////////////

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, doc) => {
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            userdata: doc
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 1. Encuentra el correo
        User.findOne({'email': req.body.email}, (err,user) => {
            if(!user) return res.json({loginSuccess: false, message: 'Auth fallida, email no encontrado'})

    // 2. Obtén el password y compruébalo

            user.comparePassword(req.body.password, (err, isMatch) => {
              if(!isMatch) return res.json({loginSuccess: false, message: "Wrong Password"})

    // 3. Si todo es correcto, genera un token

              user.generateToken((err, user)=> {
                    if(err) return res.status(400).send(err)
                    // Si todo bien, debemos guardar este token como un "cookie"
                    res.cookie('restaurantes_auth', user.token).status(200).json(
                        {loginSuccess: true}
                    )
                })
            })
        })
})


///////////////////////////////////////////////
//                  RESTAURANTS                    
///////////////////////////////////////////////

app.get('/restaurantes', async (req,res, next) => {
    const restaurantes = await Restaurante.find({})
    res.status(200).send(restaurantes);
})

app.post('/restaurantes', async (req,res, next) => {
    const restaurante = new Restaurante(req.body);

    restaurante.save((err,doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            restaurantdata: doc
        });
    })
    
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

