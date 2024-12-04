const express = require('express');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { Hobby } = require('./models/hobby_category_model');

// Configuração do AWS SDK
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1' // Região do seu bucket S3
});

const s3 = new aws.S3();

// Configuração do Multer para fazer upload para o S3
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'acho-bucket',
        acl: 'public-read', // Torna o arquivo acessível publicamente
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            // Gerar um nome único para o arquivo
            const fileName = Date.now().toString() + '-' + file.originalname;
            cb(null, fileName);
        }
    })
});

const app = express();

// Rota para o upload da imagem de hobby
app.post('/upload-hobby-image', upload.single('photo_hobby'), async (req, res) => {
    try {
        // O URL da imagem será armazenado no banco
        const imageUrl = req.file.location; // URL da imagem no S3

        const { name, category } = req.body;

        // Criar um novo hobby com a URL da imagem
        const newHobby = new Hobby({
            name,
            icon_hobby: imageUrl // Salvar o URL no banco
        });

        await newHobby.save();
        res.status(200).json({ message: 'Hobby criado com sucesso', hobby: newHobby });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
    }
});

