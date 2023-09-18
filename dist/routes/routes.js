"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_1 = require("../controllers/file");
const products_1 = require("../controllers/products");
const multer_1 = require("../middleware/multer");
const verifyFileUpload_1 = require("../middleware/verifyFileUpload");
const routes = (0, express_1.Router)();
routes.use(multer_1.file.single('csv'));
routes.use(verifyFileUpload_1.verifyFileUpload);
routes.post('/file', file_1.analyzeFile);
routes.patch('/products', products_1.updateProducts);
exports.default = routes;
