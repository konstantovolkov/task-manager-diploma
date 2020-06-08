import { TaskService } from './Task.service';
import { Get, Post, Put, Delete, JsonController, OnUndefined, HttpCode, Body, Authorized } from 'routing-controllers';
import { Task } from './Task.model';
import { Service } from 'typedi';
import { IntParam } from '../../utils/decorators/IntParam';
import { TasksNotFoundError } from './TasksNotFoundError';
import { TaskNotFoundError } from './TaskNotFoundError';
import { updateEntityOptions } from '../../utils/updateEntityOptions';

@Authorized()
@Service()
@JsonController('/subjects/:subjectId/tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get('/')
  @OnUndefined(TasksNotFoundError)
  async getAll(@IntParam('subjectId') subjectId: number) {
    return await this.service.getList(subjectId);
  }

  @Get('/:taskId')
  @OnUndefined(TaskNotFoundError)
  async getById(@IntParam('subjectId') subjectId: number,
    @IntParam('taskId') taskId: number) {
    return this.service.getById(taskId, subjectId)
  }

  @Post('/')
  @HttpCode(201)
  @OnUndefined(TasksNotFoundError)
  async create(@Body() task: Task, @IntParam('subjectId') subjectId: number,) {
    return this.service.create(task, subjectId)
  }

  @Put('/:taskId')
  @HttpCode(201)
  @OnUndefined(TaskNotFoundError)
  async update(@IntParam('subjectId') subjectId: number,
    @Body(updateEntityOptions) task: Task,
    @IntParam('subjectId') taskId: number,) {
    return this.service.update(taskId, task, subjectId)
  }

  @Delete('/:taskId')
  @OnUndefined(TaskNotFoundError)
  async delete(@IntParam('subjectId') subjectId: number,
    @IntParam('taskId') taskId: number,) {
    return this.service.delete(taskId, subjectId)
  }
}