import { Request, Response } from "express";
import { parseCsvFile } from "../helpers/parseCsvFile";
import { verifyBrokenRules } from "../helpers/verifyBrokenRules";
import { removeDuplicateRules } from "../helpers/removeDuplicateRules";

export const analyzeFile = async (req: Request, res: Response) => {
  try {
    const results = await parseCsvFile(req.file!.buffer);
    const productsAndRules = await verifyBrokenRules(results);
    const response = removeDuplicateRules(productsAndRules);

    res.json(response);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}