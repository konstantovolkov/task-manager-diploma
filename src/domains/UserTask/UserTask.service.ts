import { getRepository } from "typeorm";
import { Task } from "../Task/Task.model";
import { UserTask } from "./UserTask.model";
import { User } from "../User/User.model";
import { Service } from "typedi";
import { WorkingSession } from "./WorkingSession.model";

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

  private get workingSessionRepo() {
    return getRepository(WorkingSession);
  }
  
  async addWorkingSession(session: WorkingSession, taskId: number, userId: number) {
    const userTask = await this.getByTaskId(taskId, userId);

    if (userTask) {
      userTask.workingSessions.push(session);
      return this.userTaskRepo.save(userTask);
    }
  }

  async getByTaskId(taskId: number, userId: number) {
    const queryBuilder = this.userTaskRepo.createQueryBuilder('user_task');
    queryBuilder.where('\"taskId\" = :taskId', { taskId: taskId })
      .andWhere('\"userId\" = :userId', { userId: userId });
    queryBuilder.leftJoinAndSelect('user_task.workingSessions', 'workingSession');
    queryBuilder.leftJoinAndSelect('user_task.task', 'task');
    
    return queryBuilder.getOne();
  }

  async getList(userId: number) {
    const user = await this.userRepo.findOne(userId);
    
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