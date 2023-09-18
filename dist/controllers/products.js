"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducts = void 0;
const parseCsvFile_1 = require("../helpers/parseCsvFile");
const verifyBrokenRules_1 = require("../helpers/verifyBrokenRules");
const connection_1 = require("../database/connection");
const updateProducts = async (req, res) => {
    var _a;
    try {
        const results = await (0, parseCsvFile_1.parseCsvFile)(req.file.buffer);
        const productsAndRules = await (0, verifyBrokenRules_1.verifyBrokenRules)(results);
        for (const item of productsAndRules) {
            if ((_a = item.broken_rules) === null || _a === void 0 ? void 0 : _a.length) {
                return res.status(400).json({ mensagem: 'Existem pendências a serem resolvidas no arquivo CSV. Por favor, resolva essas pendências e reenvie o arquivo para nova verificação' });
            }
        }
        for (const item of productsAndRules) {
            await (0, connection_1.knex)('products').update({ sales_price: Number(item.new_price) }).where({ code: Number(item.product_code) });
        }
        res.status(200).json({ mensagem: 'Preços atualizados com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.updateProducts = updateProducts;
