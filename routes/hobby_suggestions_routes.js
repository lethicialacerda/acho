const express = require('express');
const { suggestHobbies } = require('../controllers/hobby_suggestions_controller');

const router = express.Router();

// Rota para sugerir hobbies
router.get('/suggest-hobbies', suggestHobbies);

module.exports = router;
