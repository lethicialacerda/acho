require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connectDB = require('./db')
const cors = require('cors');
const authRoutes = require('./routes/login_routes');
const hobbySubcategoryRoutes = require('./routes/hobby_subcategory_routes');
const hobbycategoryRoutes = require('./routes/hobby_category_routes');
const hobbySuggestionsRoutes = require('./routes/hobby_suggestions_routes');
const companyHobbyRoutes = require('./routes/company_hobby_routes');


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
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//Open route - public route
app.get('/', (req, res)=>{
    res.status(200).json({msg: "bem vindo"})
})


//cors

const corsOptions = {
    origin: 'http://localhost:4200', // ou a URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(cors(corsOptions));
  


// Rotas de autenticação
app.use('/auth', authRoutes);
app.use('/api/hobby-subcategories', hobbySubcategoryRoutes);
app.use('/api/hobby-categories', hobbycategoryRoutes);
app.use('/api/company-hobbies', companyHobbyRoutes);
app.use('/company-hobbies', companyHobbyRoutes);

