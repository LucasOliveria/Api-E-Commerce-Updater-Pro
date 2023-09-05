import { NextFunction, Request, Response } from "express";

export const verifyFileUpload = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ mensagem: 'Nenhum arquivo CSV enviado' });
  }
  next();
}