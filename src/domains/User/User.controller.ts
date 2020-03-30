import { Request, Response} from 'express';
import { UserService } from './User.service';
import { RouteController } from '../Base/RouteController';
import { Controller } from '../../utils/decorators/controller';
import { Get, Post, Put, Delete } from '../../utils/decorators/route';

@Controller
export class UserController extends RouteController<UserService> {
  init() {
    this.service = new UserService();
  }

  @Get('/')
  async getAll(req: Request, res: Response) {
    const users = await this.service.getList();

    res.status(200).send(users);
  }

  @Get('/:id')
  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    const user = await this.service.getById(id);

    res.status(200).send(user);
  }

  @Post('/')
  async create(req: Request, res: Response) {
    const newUser = req.body.user;

    await this.service.create(newUser);

    res.sendStatus(201);
  }

  @Put('/')
  async update(req: Request, res: Response) {
    const newUser = req.body.user;

    await this.service.update(newUser);

    res.sendStatus(201);
  }

  @Delete('/:id')
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    await this.service.delete(id);

    res.sendStatus(200);
  }
}
