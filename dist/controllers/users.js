"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = require("../database/connection");
const registerUser = async (req, res) => {
    const user = {
        email: "updaterpro_teste@market.com",
        password: "teste123456"
    };
    try {
        const password = await bcrypt_1.default.hash(user.password, 10);
        await (0, connection_1.knex)("users").insert({ ...user, password });
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ mensagem: 'Email e senha obrigatórios' });
    }
    try {
        const user = await (0, connection_1.knex)("users").where({ email }).first();
        if (!user) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado. Verifique o email e senha.' });
        }
        const checkPassword = await bcrypt_1.default.compare(password, user.password);
        if (!checkPassword) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado. Verifique o email e senha.' });
        }
        const { password: _, ...data } = user;
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.loginUser = loginUser;
