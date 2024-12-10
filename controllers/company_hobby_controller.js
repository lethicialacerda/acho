const Hobby_Category = require('../models/hobby_category_model'); 
const Company_hobby = require('../models/company_hobby_model'); 


exports.addCompany_hobby = async (req, res) => {
    try {
        const { name, categoryId, companyId, description, duration_time, adress, price } = req.body;

        // Verificar se a categoria existe no banco
        const category = await Hobby_Category.findById(categoryId);
        console.log("Category ID recebido:", categoryId);
        console.log("Categoria encontrada no banco:", category);

        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        // Verificar se a companhia existe no banco
        const company = await Company.findById(companyId);
        console.log("Company ID recebido:", companyId);
        console.log("Companhia encontrada no banco:", company);

        if (!company) {
            return res.status(404).json({ message: 'Companhia não encontrada' });
        }

        // Criar e salvar um novo hobby vinculado a uma categoria e companhia
        const newCompany_hobby = new Company_hobby({
            name,
            category: category._id,
            company: company._id,
            description,
            duration_time,
            adress,
            price,
        });

        await newCompany_hobby.save();

        res.status(201).json({
            message: 'Hobby criado com sucesso',
            company_hobby: newCompany_hobby,
        });
    } catch (err) {
        console.error("Erro no controller addCompany_hobby:", err);
        res.status(500).json({ message: 'Erro ao criar hobby' });
    }
};


// Função para buscar hobbies filtrados por preço e endereço
exports.getHobbiesByFilter = async (req, res) => {
  try {
    const { minPrice, maxPrice, address } = req.query;

    // Validação dos parâmetros
    if (!minPrice || !maxPrice) {
      return res.status(400).json({ message: 'Parâmetros de preço inválidos' });
    }

    if (parseFloat(minPrice) >= parseFloat(maxPrice)) {
      return res.status(400).json({ message: 'O preço mínimo não pode ser maior ou igual ao preço máximo' });
    }

    // Se o endereço for fornecido, realizamos o filtro com o regex
    let query = {
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
    };

    if (address) {
      // Filtra por endereço usando regex (para buscar hobbies que contenham o endereço fornecido)
      query.adress = { $regex: new RegExp(address, 'i') };
    }

    // Busca os hobbies no banco com o filtro aplicado
    const hobbies = await Company_hobby.find(query);

    res.status(200).json(hobbies);
  } catch (err) {
    console.error('Erro ao buscar hobbies:', err);
    res.status(500).json({ message: 'Erro ao buscar hobbies' });
  }
};

