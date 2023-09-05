import { Request, Response } from "express";
import { knex } from "../database/connection";

export const updateProduct = async (req: Request, res: Response) => {
  // const produtcs = await knex('products');
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo CSV enviado' })
  }
  res.json(req.file);
}