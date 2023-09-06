import { Request, Response } from "express";
import { parseCsvFile } from "../helpers/parseCsvFile";
import { knex } from "../database/connection";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const results = await parseCsvFile(req.file!.buffer);

    const product = await knex('products').where({ code: results[0].product_code })

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}