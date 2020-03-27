import { Task } from './Task.model';
import { Service } from '../Base/Service';
import { getRepository } from 'typeorm';
import { Subject } from '../Subject/Subject.model';
import { SubjectService } from '../Subject/Subject.service';

export class TaskService implements Service<Task> {
  private subjectService: SubjectService;

  constructor() {
    this.subjectService = new SubjectService();
  }

  async getById(id: number): Promise<Task> {
    const task = await getRepository(Task).findOne(id,
      { relations: ['subject'] });

    if (task) {
      return task
    }

    throw new Error('Task not found');
  }

  async getList(): Promise<Task[]> {
    return await getRepository(Task).find({ relations: ['subject'] })
  }

  async create({ description, title, estimatedTime, subjectId }: Task): Promise<Task> {
    if (this.subjectService.exists(subjectId)) {
      const newTask = new Task();
      newTask.description = description;
      newTask.estimatedTime = estimatedTime;
      newTask.title = title;
      newTask.subjectId = subjectId;

      return await getRepository(Task).save(newTask);

    }
    throw new Error('Subject not found');
  }

  async update({ id, description, title, estimatedTime, subjectId }: Task): Promise<Task> {
    const taskReposiory = getRepository(Task);

    const updatedTask = await this.getById(id);
    if (this.subjectService.exists(subjectId)) {
      updatedTask.description = description;
      updatedTask.estimatedTime = estimatedTime;
      updatedTask.title = title;
      updatedTask.subjectId = subjectId;
    }

    return taskReposiory.save(updatedTask)
  }

  async exists(id: number): Promise<boolean> {
    return !!await getRepository(Task).findOne(id);
  }

  async delete(id: number): Promise<void> {
    const task = await this.getById(id)

    getRepository(Task).delete(task.id);
  }
}