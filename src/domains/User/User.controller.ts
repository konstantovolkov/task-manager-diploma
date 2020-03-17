import express, { Request, Response } from 'express';
import { UserService } from './User.service';
import { RouteController } from '../Base/RouteController';

export class UserController extends RouteController<UserService> {
  init() {
    this.service = new UserService();

    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  private async getAll(req: Request, res: Response) {
    try {
      const users = await this.service.getList();

      res.status(200).send(users);
    } catch (e) {
      console.log(e);
      res.status(404).send(e.message);
    }
  }

  private async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      const user = await this.service.getById(id);

      res.status(200).send(user);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }

  private async create(req: Request, res: Response) {
    try {
      const newUser = req.body.user;

      await this.service.create(newUser);

      res.sendStatus(201);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }

  private async update(req: Request, res: Response) {
    try {
      const newUser = req.body.user;

      await this.service.update(newUser);

      res.sendStatus(201);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }

  private async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      await this.service.delete(id);

      res.sendStatus(200);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
}
