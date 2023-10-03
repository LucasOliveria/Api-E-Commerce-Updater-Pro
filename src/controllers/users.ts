import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../types/types";
import { knex } from "../database/connection";

export const registerUser = async (req: Request, res: Response) => {
  const user = {
    email: "updaterpro_teste@market.com",
    password: "teste123456"
  }

  try {
    const password = await bcrypt.hash(user.password, 10);

    await knex<User>("users").insert({ ...user, password })

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensagem: 'Email e senha obrigatórios' });
  }

  try {
    const user = await knex<User>("users").where({ email }).first()

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado. Verifique o email e senha.' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado. Verifique o email e senha.' });
    }

    const { password: _, ...data } = user

    res.status(200).json(data);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}