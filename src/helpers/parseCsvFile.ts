import { Stream } from "stream"
import csvParser from "csv-parser";
import { ReadCsvFile } from "../types/types";

export const parseCsvFile = (csvBuffer: Buffer): Promise<ReadCsvFile[]> => {
  return new Promise((resolve, reject) => {
    const results: ReadCsvFile[] = [];
    const bufferStream = new Stream.PassThrough().end(csvBuffer);

    bufferStream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results)
      })
      .on('error', (error) => {
        reject(error);
      })
  })
}