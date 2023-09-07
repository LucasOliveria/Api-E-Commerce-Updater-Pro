import { knex } from "../database/connection";
import { Product, ProductCsvFile, ReadCsvFile } from "../types/types";

export const verifyBrokenRules = async (csvJson: ReadCsvFile[]): Promise<ProductCsvFile[]> => {
  const newCsvJson: ProductCsvFile[] = csvJson.map((element) => { return { ...element, name: '', sales_price: 0, broken_rules: [] } });

  for (const element of newCsvJson) {
    if (!isNaN(Number(element.product_code))) {
      const product = await knex<Product>('products').where({ code: Number(element.product_code) }).first();

      if (product) {
        element.name = product?.name;
        element.sales_price = product.sales_price;

        if (!isNaN(Number(element.new_price)) && element.new_price) {
          if (Number(element.new_price) < product.cost_price) {
            element.broken_rules?.push(`O novo preço de venda não pode ser menor que o preço de custo do produto: R$${product.cost_price}`);
          }

          const percentageNewPrice = Number(element.new_price) * 100 / product.sales_price;
          const highestPriceSuggestion = (product.sales_price * 1.1).toFixed(2);
          const lowestPriceSuggestion = (product.sales_price * 0.9).toFixed(2);

          if (percentageNewPrice > 110 || percentageNewPrice < 90) {
            element.broken_rules?.push(`O novo preço de venda não pode ser maior ou menor que 10% do preço atual. Sugestão de preço: Maior que R$ ${lowestPriceSuggestion} e menor que R$ ${highestPriceSuggestion}`);
          }

          const decimalPlacesNewPrice = element.new_price.split('.')[1]

          if (decimalPlacesNewPrice.length > 2) {
            element.broken_rules?.push('O novo preço de venda informado deve ter no máximo 2 casas decimais');
          }
        } else {
          element.broken_rules?.push('O novo preço de venda não é um valor numérico válido ou não foi informado');
        }
      } else {
        element.broken_rules?.push('O código de produto não foi informado ou não corresponde a nenhum produto');
      }
    } else {
      element.broken_rules?.push('O código de produto informado não é um número');
    }

  }
  return newCsvJson;
}