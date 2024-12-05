require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connectDB = require('./db')
const authRoutes = require('./routes/login_routes');
const hobbySubcategoryRoutes = require('./routes/hobby_subcategory_routes');
const hobbycategoryRoutes = require('./routes/hobby_category_routes');


//Models
const Login = require('./models/login_model')


const app = express();

// Connect to database and inicialize the server
connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
});

//Config JSON response
app.use(express.json())
app.use(express.urlencoded({ extended: true }));




//Open route - public route
app.get('/', (req, res)=>{
    res.status(200).json({msg: "bem vindo"})
})

// Rotas de autenticação
app.use('/auth', authRoutes);
app.use('/hobby', hobbySubcategoryRoutes);
app.use('/hobby', hobbycategoryRoutes);
