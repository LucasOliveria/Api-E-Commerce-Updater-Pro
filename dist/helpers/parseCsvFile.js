"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsvFile = void 0;
const stream_1 = require("stream");
const csv_parser_1 = __importDefault(require("csv-parser"));
const parseCsvFile = (csvBuffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const bufferStream = new stream_1.Stream.PassThrough().end(csvBuffer);
        bufferStream
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            resolve(results);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
};
exports.parseCsvFile = parseCsvFile;
