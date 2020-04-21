import { SubjectService } from './Subject.service';
import { Body, Get, Post, Put, Delete, JsonController, OnUndefined,
  HttpCode, QueryParams, QueryParam,} from "routing-controllers";
import { Subject } from './Subject.model';
import { Service } from 'typedi';
import { IntParam } from '../../utils/decorators/IntParam';
import { UserNotFoundError } from '../User/UserNotFoundError';
import { SubscriptionFailedError } from './SubscriptionFailedError';
import { SubjectNotFoundError } from './SubjectNotFoundError';
import { updateEntityOptions } from '../../utils/updateEntityOptions';
import { SubjectsListQuery } from './SubjectListQuery';
import { createSubjectOptions } from './createSubjectOptions';
import { getSubjectsOptions } from './getSubjectsOptions';

@Service()
@JsonController('/subjects')
export class SubjectController {
  constructor(private service: SubjectService) {}

  @Get('/')
  async getAll(
    @QueryParams(getSubjectsOptions)
    subjectsListQuery: SubjectsListQuery ) {
    return await this.service.getList(subjectsListQuery);
  }

  @Get('/:id')
  @OnUndefined(SubjectNotFoundError)
  async getById(@IntParam('id') id: number) {
    return await this.service.getById(id);
  }

  @Post('/')
  @HttpCode(201)
  @OnUndefined(UserNotFoundError)
  async create(@Body() subject: Subject, @QueryParam('authorId', createSubjectOptions) authorId: number) {
    return this.service.create(subject, authorId)
  }

  @Put('/:id')
  @HttpCode(201)
  @OnUndefined(SubjectNotFoundError)
  async update(@IntParam('id') id: number, @Body(updateEntityOptions) subject: Subject) {
    return await this.service.update(id, subject);
  }

  @Put('/:subjectId/subscribe/:userId')
  @HttpCode(201)
  @OnUndefined(SubscriptionFailedError)
  async subscribe(@IntParam('subjectId') subjectId: number,
    @IntParam('userId') userId: number ) {
    return this.service.subscribe(subjectId, userId);
  }
  
  @Delete('/:id')
  @OnUndefined(SubjectNotFoundError)
  async delete(@IntParam('id') id: number) {
    return this.service.delete(id);
  }
}
