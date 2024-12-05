const Hobby_subcategory = require('../models/hobby_subcategory_model'); // Certifique-se do caminho correto

exports.addHobbySubcategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Validação simples
        if (!name) {
            return res.status(400).json({ message: 'O campo nome é obrigatório' });
        }

        // Criar e salvar a nova subcategoria de hobby
        const newHobbySubcategory = new Hobby_subcategory({ name });

        await newHobbySubcategory.save();

        res.status(201).json({
            message: 'Subcategoria de hobby criada com sucesso',
            hobby_subcategory: newHobbySubcategory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar a subcategoria de hobby' });
    }
};


