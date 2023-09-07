import { ProductCsvFile } from "../types/types";
import lodash from 'lodash';

export const removeDuplicateRules = (productsAndRules: ProductCsvFile[]): ProductCsvFile[] => {
  const newArrayProductsAndRules: ProductCsvFile[] = [];

  for (const productAndRule of productsAndRules) {
    const newArrayRules = lodash.uniq(productAndRule.broken_rules);
    const newProductAndRules: ProductCsvFile = { ...productAndRule, broken_rules: newArrayRules }

    newArrayProductsAndRules.push(newProductAndRules);
  }

  return newArrayProductsAndRules
}