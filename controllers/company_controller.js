const Company = require('../models/company_model');

exports.addCompany = async (req, res) => {
    try {
        const { name, cnpj, description } = req.body;

        // Validação simples
        if (!name) {
            return res.status(400).json({ message: 'O campo nome é obrigatório' });
        }

        // Criar e salvar a nova companhia
        const newCompany = new Company({ name, cnpj, description });

        await newCompany.save();

        res.status(201).json({
            message: 'Companhia criada com sucesso',
            company: newCompany,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar companhia' });
    }
};


