const Hobby_Category = require('../models/hobby_category_model'); // Categoria correta
const HobbySubcategory = require('../models/hobby_subcategory_model'); // Para validar o ID da subcategoria

exports.addHobby_Category = async (req, res) => {
    try {
        const { name, subcategoryId } = req.body;

        // Verificar se a subcategoria existe
        const subcategory = await HobbySubcategory.findById(subcategoryId);
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategoria não encontrada' });
        }

        // Criar e salvar a nova categoria de hobby
        const newHobby_Category = new Hobby_Category({
            name,
            subcategory: subcategory._id // Salvar o ID da subcategoria
        });

        await newHobby_Category.save();

        res.status(201).json({
            message: 'Categoria de hobby criada com sucesso',
            hobby_category: newHobby_Category,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar a categoria de hobby' });
    }
};
