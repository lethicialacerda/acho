const Hobby_Category = require('../models/hobby_category_model');

// Função para sugerir hobbies aleatórios (qualquer subcategoria)
exports.suggestHobbies = async (req, res) => {
    try {
        // Buscar até 5 hobbies aleatórios de qualquer subcategoria
        const hobbies = await Hobby_Category.aggregate([
            { $sample: { size: 5 } } // Selecionar 5 aleatórios
        ]);

        if (hobbies.length === 0) {
            return res.status(404).json({ message: 'Nenhum hobby encontrado.' });
        }

        res.status(200).json({ suggestions: hobbies });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar sugestões de hobbies.' });
    }
};

