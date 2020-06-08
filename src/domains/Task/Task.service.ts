import { Task } from './Task.model';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';;
import { Subject } from '../Subject/Subject.model';
import { User } from '../User/User.model';
import { UserTask } from '../UserTask/UserTask.model';

@Service()
export class TaskService {
  private get taskRepo() {
    return getRepository(Task);
  }

  private get userRepo() {
    return getRepository(User);
  }

  private get subjectRepo() {
    return getRepository(Subject);
  }

  async getById(id: number, subjectId: number) {
    const subject = await this.subjectRepo.findOne({ id: subjectId });

    if (subject) {
      return await this.taskRepo.findOneOrFail(id,
        {
          where: { subjectId: subject.id }
        });
    }
  }

  async getList(subjectId: number) {
    const subject = await this.subjectRepo.findOne(subjectId, { relations: ['tasks'] });

    return subject?.tasks
  }

  async create(task: Task, subjectId: number) {
    const subject = await this.subjectRepo.findOne(subjectId, { relations: ['tasks',] });
    
    if (subject) {
      const users = await this.userRepo.find({
        join: {
          alias: 'user',
          innerJoinAndSelect: {
            userTasks: 'user.userTasks',
            subjects: 'user.subjects'
          }
        },
        where: {
          subjectId: subjectId
        }
      })

      users?.forEach(user => {
        user.userTasks.push(new UserTask(task))
        this.userRepo.save(user)
      })

      subject.tasks.push(task);
      await this.subjectRepo.save(subject)
  
      return task;
    }
  }

  async update(id: number, task: Task, subjectId: number) {
    const subject = await this.subjectRepo.findOne(subjectId);
    const oldTask = await this.taskRepo.findOne(id, {
      where: { subjectId: subjectId }
    });

    if (subject && oldTask) {
      const newTask: Task = { ...oldTask, ...task }
    
      return this.taskRepo.save(newTask);
    }
  }

  async delete(id: number, subjectId: number) {
    const task = await this.getById(id, subjectId)
    
    if (task) {
      return this.taskRepo.remove(task);
    }
  }
}