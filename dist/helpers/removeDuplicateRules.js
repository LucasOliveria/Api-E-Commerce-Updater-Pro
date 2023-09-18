"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicateRules = void 0;
const lodash_1 = __importDefault(require("lodash"));
const removeDuplicateRules = (productsAndRules) => {
    const newArrayProductsAndRules = [];
    for (const productAndRule of productsAndRules) {
        const newArrayRules = lodash_1.default.uniq(productAndRule.broken_rules);
        const newProductAndRules = { ...productAndRule, broken_rules: newArrayRules };
        newArrayProductsAndRules.push(newProductAndRules);
    }
    return newArrayProductsAndRules;
};
exports.removeDuplicateRules = removeDuplicateRules;
