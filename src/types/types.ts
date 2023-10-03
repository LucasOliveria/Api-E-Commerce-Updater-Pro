export type ReadCsvFile = {
  product_code: string,
  new_price: string,
  broken_rules?: string[]
}

export type Product = {
  code: number,
  name: string,
  cost_price: number,
  sales_price: number
}

export type ProductCsvFile = ReadCsvFile & Pick<Product, 'name' | 'sales_price'>

export type Pack = {
  id: number,
  pack_id: number,
  product_id: number,
  qty: number
}

export type User = {
  id: number,
  email: string,
  password: string
}