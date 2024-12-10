const express = require('express');
const { addCompany } = require('../controllers/company_controller');

const router = express.Router();

// Rota para adicionar uma companhia
router.post('/add-company', addCompany);

module.exports = router;
