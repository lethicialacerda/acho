require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connectDB = require('./db')
//Models
const Login = require('./models/login_model')


const app = express();

connectDB();

//Config JSON response
app.use(express.json())


//Open route - public route
app.get('/', (req, res)=>{
    res.status(200).json({msg: "bem vindo"})
})

//Register user

app.post('/auth/register', async(req, res)=>{

    const{email, password, confirmPassword} = req.body

    //Validations
    if(!email){
        return res.status(422).json({msg: 'Email obrigatorio'})
    }
    if(!password){
        return res.status(422).json({msg: 'Senha obrigatorio'})
    }

    if(password !== confirmPassword){
        return res.status(422).json({msg:'Senhas nao conferem'})
    }

    //Check if register exist
    const registerExists = await Login.findOne({ email: email })

    if(registerExists){
        return res.status(422).json({msg:'Email ja cadastrado'})
    }

    //Create password

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create Register
    const login = new Login({
        email,
        password
    }) 

    try{

        await login.save()
        res.status(201).json({msg: 'Login criado'})

    }catch(error){
        console.log(error)
        res.status(500).json({msg:'Server error'})
    }
})

//Credencials



