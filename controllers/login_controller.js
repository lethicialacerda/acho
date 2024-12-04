const Login = require('../models/login_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || password !== confirmPassword) {
        return res.status(422).json({ msg: 'Preencha todos os campos corretamente.' });
    }

    const userExists = await Login.findOne({ email });
    if (userExists) {
        return res.status(422).json({ msg: 'Email já cadastrado' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
        const user = await Login.create({ email, password: passwordHash });
        res.status(201).json({ msg: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }

    const user = await Login.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(422).json({ msg: 'Credenciais inválidas' });
    }

    try {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({ msg: 'Autenticação bem-sucedida', token });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' });
    }
};

exports.getUser = async (req, res) => {
    const user = await Login.findById(req.params.id, '-password');
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    res.status(200).json({ user });
};