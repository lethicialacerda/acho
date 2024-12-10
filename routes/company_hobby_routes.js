const express = require('express');
const router = express.Router();
const CompanyHobby = require('../models/company_hobby_model');

// Rota para listar hobbies filtrados
router.get('/', async (req, res) => {
  const { address, minPrice, maxPrice } = req.query;

  const filter = {};
  if (address) filter.address = { $regex: new RegExp(address, 'i') }; // Filtro por endereço
  if (minPrice) filter.price = { ...filter.price, $gte: parseFloat(minPrice) }; // Preço mínimo
  if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) }; // Preço máximo

  try {
    const hobbies = await CompanyHobby.find(filter);
    res.json(hobbies);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar hobbies', details: error.message });
  }
});

// Rota para criar um novo hobby
router.post('/', async (req, res) => {
  const { name, description, image, address, price } = req.body;

  try {
    const newHobby = new CompanyHobby({ name, description, image, address, price });
    await newHobby.save();
    res.status(201).json(newHobby);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar hobby', details: error.message });
  }
});

module.exports = router;


