import { getRepository } from "typeorm";
import { Task } from "../Task/Task.model";
import { UserTask } from "./UserTask.model";
import { User } from "../User/User.model";
import { Service } from "typedi";

@Service()
export class UserTaskService {
  private get taskRepo() {
    return getRepository(Task);
  }
  
  private get userTaskRepo() {
    return getRepository(UserTask);
  }
  
  private get userRepo() {
    return getRepository(User);
  }
  
  async getByTaskId(taskId: number, userId: number) {
    const task = await this.taskRepo.findOneOrFail(taskId);
    const user = await this.userRepo.findOneOrFail(userId);

    if (user && task) {
      return await this.userTaskRepo.findOne({
        where: {
          task: task,
          user: user
        },
        relations: ['task'] 
      })
    }
  }

  async getList(userId: number) {
    const user = await this.userRepo.findOneOrFail(userId);
    
    if (user) {
      return await this.userTaskRepo.find({
        where: {
          user: user
        },
        relations: ['task'] 
      })
    }
  }

  async updateByTaskId(taskId: number, userTask: UserTask, userId: number) {
    const oldUserTask = await this.getByTaskId(taskId, userId);

    if (oldUserTask) {
      const newUserTask: UserTask = { ...oldUserTask, ...userTask}
  
      return this.userTaskRepo.save(newUserTask);
    }
  }

  async deleteTaskForUser(taskId: number, userId: number): Promise<void> {
    const userTask = await this.getByTaskId(taskId, userId);
    
    if (userTask) {
      this.userTaskRepo.remove(userTask);
    }
  }
}