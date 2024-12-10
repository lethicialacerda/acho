const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    cnpj: {type: String},
    description: {type: String}
  
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;