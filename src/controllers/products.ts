import { Request, Response } from "express";
import { parseCsvFile } from "../helpers/parseCsvFile";
import { verifyBrokenRules } from "../helpers/verifyBrokenRules";
import { knex } from "../database/connection";
import { Product } from "../types/types";

export const updateProducts = async (req: Request, res: Response) => {
  try {
    const results = await parseCsvFile(req.file!.buffer);
    const productsAndRules = await verifyBrokenRules(results);

    for (const item of productsAndRules) {
      if (item.broken_rules?.length) {
        return res.status(400).json({ mensagem: 'Existem pendências a serem resolvidas no arquivo CSV. Por favor, resolva essas pendências e reenvie o arquivo para nova verificação' });
      }
    }

    for (const item of productsAndRules) {
      await knex<Product>('products').update({ sales_price: Number(item.new_price) }).where({ code: Number(item.product_code) });
    }

    res.status(200).json({ mensagem: 'Preços atualizados com sucesso!' })
  } catch (error: any) {
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}