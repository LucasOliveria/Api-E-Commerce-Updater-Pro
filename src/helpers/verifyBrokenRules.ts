import { knex } from "../database/connection";
import { Product, ProductCsvFile, ReadCsvFile } from "../types/types";

export const verifyBrokenRules = async (csvJson: ReadCsvFile[]): Promise<ProductCsvFile[]> => {
  const newCsvJson: ProductCsvFile[] = csvJson.map((element) => { return { ...element, name: '', sales_price: 0, broken_rules: [] } });

  for (const element of newCsvJson) {
    if (!isNaN(Number(element.product_code))) {
      const product = await knex<Product>('products').where({ code: Number(element.product_code) }).first();

      if (!product) {
        element.broken_rules?.push('O código de produto não foi informado ou não corresponde a nenhum produto');
      }

      if (product) {
        element.name = product?.name;
        element.sales_price = product.sales_price;

        if (!isNaN(Number(element.new_price))) {
          if (Number(element.new_price) < product.cost_price) {
            element.broken_rules?.push(`O preço de venda informado não pode ser menor que o preço de custo do produto: R$${product.cost_price}`);
          }
        } else {
          element.broken_rules?.push('O preço informado não é um valor numérico válido');
        }
      }

      if (!element.new_price) {
        element.broken_rules?.push('Informe o novo preço do produto');
      }
    }

    if (isNaN(Number(element.product_code))) {
      element.broken_rules?.push('O código de produto informado não é um número');
    }
  }
  return newCsvJson;
}