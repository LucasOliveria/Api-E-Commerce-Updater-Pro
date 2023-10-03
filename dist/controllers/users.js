"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const knex_1 = __importDefault(require("knex"));
const registerUser = async (req, res) => {
    const user = {
        email: "updaterpro_teste@market.com",
        password: "teste123456"
    };
    try {
        const password = await bcrypt_1.default.hash(user.password, 10);
        const userRegisted = await (0, knex_1.default)("users").insert({ ...user, password });
        console.log(userRegisted);
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.registerUser = registerUser;
