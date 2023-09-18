"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBrokenRules = void 0;
const connection_1 = require("../database/connection");
const verifyBrokenRules = async (csvJson) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const newCsvJson = csvJson.map((element) => { return { ...element, name: '', sales_price: 0, broken_rules: [] }; });
    for (const element of newCsvJson) {
        if (!isNaN(Number(element.product_code))) {
            const product = await (0, connection_1.knex)('products').where({ code: Number(element.product_code) }).first();
            if (product) {
                element.name = product === null || product === void 0 ? void 0 : product.name;
                element.sales_price = product.sales_price;
                if (!isNaN(Number(element.new_price)) && element.new_price) {
                    if (Number(element.new_price) < product.cost_price) {
                        (_a = element.broken_rules) === null || _a === void 0 ? void 0 : _a.push(`O novo preço de venda não pode ser menor que o preço de custo do produto: R$${product.cost_price}; `);
                    }
                    const percentageNewPrice = Number(element.new_price) * 100 / product.sales_price;
                    const highestPriceSuggestion = (product.sales_price * 1.1).toFixed(2);
                    const lowestPriceSuggestion = (product.sales_price * 0.9).toFixed(2);
                    if (percentageNewPrice > 110 || percentageNewPrice < 90) {
                        (_b = element.broken_rules) === null || _b === void 0 ? void 0 : _b.push(`O novo preço de venda não pode ser maior ou menor que 10% do preço atual. Sugestão de preço aproximado: Maior que R$ ${lowestPriceSuggestion} e menor que R$ ${highestPriceSuggestion}; `);
                    }
                    const decimalPlacesNewPrice = element.new_price.split('.')[1];
                    if (!decimalPlacesNewPrice || decimalPlacesNewPrice.length > 2) {
                        (_c = element.broken_rules) === null || _c === void 0 ? void 0 : _c.push('O novo preço de venda informado deve ter no máximo 2 casas decimais; ');
                    }
                }
                else {
                    (_d = element.broken_rules) === null || _d === void 0 ? void 0 : _d.push('O novo preço de venda não é um valor numérico válido ou não foi informado; ');
                }
                const packProduct = await (0, connection_1.knex)('packs').where({ product_id: product.code }).first();
                if (packProduct) {
                    const findPack = newCsvJson.find((item) => Number(item.product_code) === packProduct.pack_id);
                    if (!findPack) {
                        (_e = element.broken_rules) === null || _e === void 0 ? void 0 : _e.push(`Esse produto faz parte de um pacote. As informações do código do pacote e seu novo preço também devem estar no arquivo CSV. Código do Pacote: ${packProduct.pack_id}; `);
                    }
                    else {
                        const packs = await (0, connection_1.knex)('packs').where({ pack_id: packProduct.pack_id });
                        if (packs.length === 1) {
                            const totalPackPrice = Number((Number(element.new_price) * packs[0].qty).toFixed(2));
                            if (totalPackPrice !== Number(findPack.new_price)) {
                                (_f = findPack.broken_rules) === null || _f === void 0 ? void 0 : _f.push(`Preço total do pacote apresenta divergência. Verifique se a soma dos preços de todos os produto que fazem parte do pacote está de acordo com o novo preço do pacote. Valor total dos produtos informados: R$${totalPackPrice}. Codigo do produto desse pacote: ${packs[0].product_id}; `);
                            }
                        }
                        if (packs.length > 1) {
                            let totalPackPrice = 0;
                            for (const pack of packs) {
                                const packageProducts = newCsvJson.filter((item) => Number(item.product_code) === pack.product_id);
                                if (!packageProducts.length) {
                                    (_g = findPack.broken_rules) === null || _g === void 0 ? void 0 : _g.push(`Um produto que faz parte desse pacote não foi informado no arquivo CSV. Código do produto: ${pack.product_id}; `);
                                }
                                else {
                                    totalPackPrice += Number((Number(packageProducts[0].new_price) * pack.qty).toFixed(2));
                                }
                            }
                            if (Number(totalPackPrice.toFixed(2)) !== Number(findPack.new_price)) {
                                (_h = findPack.broken_rules) === null || _h === void 0 ? void 0 : _h.push(`Preço total do pacote apresenta divergência. Verifique se a soma dos preços de todos os produto que fazem parte do pacote está de acordo com o novo preço do pacote. Valor total dos produtos informados: R$${totalPackPrice.toFixed(2)}. Códigos dos produtos desse pacote: ${packs[0].product_id} e ${packs[1].product_id}; `);
                            }
                        }
                    }
                }
                const packs = await (0, connection_1.knex)('packs').where({ pack_id: product.code });
                if (packs) {
                    for (const pack of packs) {
                        const packageProducts = newCsvJson.filter((item) => Number(item.product_code) === pack.product_id);
                        if (!packageProducts.length) {
                            (_j = element.broken_rules) === null || _j === void 0 ? void 0 : _j.push(`Um produto que faz parte desse pacote não foi informado no arquivo CSV. Código do produto: ${pack.product_id}; `);
                        }
                    }
                }
            }
            else {
                (_k = element.broken_rules) === null || _k === void 0 ? void 0 : _k.push('O código de produto não foi informado ou não corresponde a nenhum produto cadastrado; ');
            }
        }
        else {
            (_l = element.broken_rules) === null || _l === void 0 ? void 0 : _l.push('O código de produto informado não é um número; ');
        }
    }
    return newCsvJson;
};
exports.verifyBrokenRules = verifyBrokenRules;
