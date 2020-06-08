import { UserService } from './User.service'
import { Body, Get, Post, Put, Delete, JsonController, OnUndefined, HttpCode, Authorized, CurrentUser } from "routing-controllers";
import { User } from './User.model';
import { Service } from 'typedi';
import { IntParam } from '../../utils/decorators/IntParam';
import { UserNotFoundError } from './UserNotFoundError';
import { updateEntityOptions } from '../../utils/updateEntityOptions';
import { UserType } from './UserType';

@Authorized()
@Service()
@JsonController('/users')
export class UserController {
  constructor(private service: UserService) {}
  
  @Get('/')
  async getAll(): Promise<User[]> {
    return await this.service.getList()
  }

  @Get('/:id')
  @Authorized()
  @OnUndefined(UserNotFoundError)
  async getById(@IntParam('id') id: number) {
    return await this.service.getById(id);
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
    return await this.service.delete(id);
  }
}