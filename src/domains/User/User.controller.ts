import express, { Request, Response } from "express";
import * as UserService from "./User.service";
import { IUser, IUsers } from "./User.interface";

export const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UserService.findAll();

    res.status(200).send(users)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    const user = await UserService.findById(id);

    res.status(200).send(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
})

usersRouter.post('/', async (req: Request, res: Response) => {
  /*try {*/
      const newUser = req.body;
      console.log(req);
      await UserService.create(newUser);

      res.sendStatus(201);
  /*} catch (e) {
    res.status(404).send(e.message)
  }*/
})

usersRouter.put('/', async (req: Request, res: Response) => {
  try {
    const updatedUser = req.body.user as IUser;

    await UserService.update(updatedUser);

    res.sendStatus(200);
  } catch(e) {
    res.status(404).send(e.message);
  }
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    await UserService.remove(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(404).send(e.message);
  }
})