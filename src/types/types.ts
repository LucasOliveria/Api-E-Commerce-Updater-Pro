export type ReadCsvFile = {
  product_code: string,
  new_price: string,
  broken_rules?: string[]
}

export type Product = {
  code: number,
  name: string,
  cost_price: string,
  sales_price: string
}

export type ProductCsvFile = ReadCsvFile & Pick<Product, 'name'>