import { Request, Response } from "express";
import { parseCsvFile } from "../helpers/parseCsvFile";
import { verifyBrokenRules } from "../helpers/verifyBrokenRules";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const results = await parseCsvFile(req.file!.buffer);

    const response = await verifyBrokenRules(results)

    res.json(response)
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}