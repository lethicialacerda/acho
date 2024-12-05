const express = require('express');
const { addHobbySubcategory } = require('../controllers/hobby_subcategory_controller');

const router = express.Router();

// Rota para adicionar subcategoria de hobby
router.post('/add-hobby-subcategory', addHobbySubcategory);

module.exports = router;

