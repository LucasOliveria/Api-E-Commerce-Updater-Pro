import { Request, Response } from "express";
import bcrypt from "bcrypt";
import knex from "knex";
import { User } from "../types/types";

export const registerUser = async (req: Request, res: Response) => {
  const user = {
    email: "updaterpro_teste@market.com",
    password: "teste123456"
  }

  try {
    const password = await bcrypt.hash(user.password, 10);

    const userRegisted = await knex<User>("users").insert({ ...user, password });
    console.log(userRegisted);

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}