const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso', userId: newUser.id });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
