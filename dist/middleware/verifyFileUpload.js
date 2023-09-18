"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFileUpload = void 0;
const verifyFileUpload = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ mensagem: 'Nenhum arquivo CSV enviado' });
    }
    if (req.file.mimetype !== "text/csv") {
        return res.status(400).json({ mensagem: 'O arquivo enviado não é CSV' });
    }
    next();
};
exports.verifyFileUpload = verifyFileUpload;
