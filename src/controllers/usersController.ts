import { Request, Response } from 'express';
import { users, User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

export const getAll = (_: Request, res: Response) => {return res.json(users)};

export const getOne = (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'name and email are required' });
  const user: User = { id: uuidv4(), name, email };
  users.push(user);
  return res.status(201).json(user);
};

export const updateUser = (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  return res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(idx, 1);
  return res.status(204).send();
};
