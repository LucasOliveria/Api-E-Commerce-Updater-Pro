import { Request, Response } from "express";
import csvParser from "csv-parser";
import { Stream } from "stream";
import { ReadCsvFile } from "../types/types";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const results: ReadCsvFile[] = [];
    const csvBuffer = req.file?.buffer;
    const bufferStream = new Stream.PassThrough().end(csvBuffer);

    bufferStream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        manipular(results);
      });

    function manipular(results: ReadCsvFile[]) {
      res.json(results);
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}