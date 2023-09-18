"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFile = void 0;
const parseCsvFile_1 = require("../helpers/parseCsvFile");
const verifyBrokenRules_1 = require("../helpers/verifyBrokenRules");
const removeDuplicateRules_1 = require("../helpers/removeDuplicateRules");
const analyzeFile = async (req, res) => {
    try {
        const results = await (0, parseCsvFile_1.parseCsvFile)(req.file.buffer);
        const productsAndRules = await (0, verifyBrokenRules_1.verifyBrokenRules)(results);
        const response = (0, removeDuplicateRules_1.removeDuplicateRules)(productsAndRules);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
exports.analyzeFile = analyzeFile;
