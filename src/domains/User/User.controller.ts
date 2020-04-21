import { UserService } from './User.service'
import { Body, Get, Post, Put, Delete, JsonController, OnUndefined, HttpCode } from "routing-controllers";
import { User } from './User.model';
import { Service } from 'typedi';
import { IntParam } from '../../utils/decorators/IntParam';
import { UserNotFoundError } from './UserNotFoundError';
import { updateEntityOptions } from '../../utils/updateEntityOptions';

@Service()
@JsonController('/users')
export class UserController {
  constructor(private service: UserService) {}
  
  @Get('/')
  async getAll(): Promise<User[]> {
    return await this.service.getList()
  }

  @Get('/:id')
  @OnUndefined(UserNotFoundError)
  async getById(@IntParam('id') id: number) {
    return await this.service.getById(id);
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() user: User) {
    return await this.service.create(user);
  }

  @Put('/:id')
  @HttpCode(201)
  @OnUndefined(UserNotFoundError)
  async update(@IntParam('id') id: number, @Body(updateEntityOptions) user: User) {
    return await this.service.update(id, user);
  }

  @Delete('/:id')
  @OnUndefined(UserNotFoundError)
  async delete(@IntParam('id') id: number) {
    return this.service.delete(id);
  }
}