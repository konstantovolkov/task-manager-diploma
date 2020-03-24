import { Task } from './Task.model';
import { Service } from '../Base/Service';
import { getRepository } from 'typeorm';
import { Subject } from '../Subject/Subject.model';

export class TaskService implements Service<Task> {
  async getById(id: number): Promise<Task> {
    const task = await getRepository(Task).findOne(id,
      { relations: ['subject'] });
      
      if (task) {
        return task
      }
      
      throw new Error('Task not found');
    }

    async getList(): Promise<Task[]> {
      return await getRepository(Task).find({ relations: ['subject']})
    }

    async create({description, title, estimatedTime, subject }: Task): Promise<Task> {
      const newTask = new Task();
      newTask.description = description;
      newTask.estimatedTime = estimatedTime;
      newTask.title = title;
      
      if (subject) {
        subject.tasks.push(newTask);

        await getRepository(Subject).save(subject);
        
        return newTask
        
      }
      throw new Error('Subject not found');
    }

    async update({ id, description, title, estimatedTime, subject }: Task): Promise<Task> {
      const taskReposiory = getRepository(Task);

      const updatedTask = await taskReposiory.findOne(id);
      if (updatedTask) {
        const oldTaskSubjectId = updatedTask.subject.id;

        if (subject && subject.id !== oldTaskSubjectId) {
          const subjectRepository =  await getRepository(Subject);
          const oldTaskSubject = await subjectRepository.findOne(oldTaskSubjectId);
          if (oldTaskSubject) {
            oldTaskSubject.tasks = oldTaskSubject.tasks.filter(task =>
              task.subject.id === oldTaskSubjectId)
          } else {
            throw new Error('Subject not found')
          }

          subject.tasks.push(updatedTask);
  
          subjectRepository.save(subject);
        }

        updatedTask.description = description;
        updatedTask.estimatedTime = estimatedTime;
        updatedTask.title = title;

        return await taskReposiory.save(updatedTask);
      }

      throw new Error('Task not found');
    }
    async delete(id: number): Promise<void> {
      throw new Error('Task not found');
    }
  }