const express = require('express');
const { addHobby_Category } = require('../controllers/hobby_category_controller');

const router = express.Router();

// Rota para adicionar categoria de hobby
router.post('/add-hobby-category', addHobby_Category);

module.exports = router;

