import { Subject } from "./Subject.model";
import { getRepository } from "typeorm";
import { User } from "../User/User.model";
import { UserTask } from "../UserTask/UserTask.model";
import { Service } from "typedi";
import { Task } from "../Task/Task.model";
import { TaskStatus } from "../UserTask/TaskStatus";
import { UserType } from "../User/UserType";

interface AuthorQuery {
  authorId?: number;
}
interface SubscriberQuery {
  subscriberId?: number;
}

type SubjectQuery = AuthorQuery & SubscriberQuery;

@Service()
export class SubjectService {
  private get subjectRepo() {
    return getRepository(Subject);
  }

  private get userRepo() {
    return getRepository(User);
  }

  private createTaskForUser(user: User) {
    return (task: Task) => {
      const userTask = new UserTask(task);
      userTask.status = TaskStatus.TODO;
      user.userTasks.push(userTask);
    };
  }

  async getById(id: number) {
    return await this.subjectRepo.findOne(id);
  }

  async getList(query?: SubjectQuery): Promise<Subject[]> {
    const queryBuilder = this.subjectRepo.createQueryBuilder("subject");

    if (query?.authorId) {
      queryBuilder.where("subject.authorId = :id", { id: query.authorId });
    }

    if (query?.subscriberId) {
      queryBuilder
        .leftJoin("subject.subscribedUsers", "user")
        .where("user.id = :id", { id: query.subscriberId });
    }

    return await queryBuilder.getMany();
  }

  async create(subject: Subject, authorId: number) {
    const author = await this.userRepo.findOne(authorId);

    if (author) {
      subject.author = author;
      return await this.subjectRepo.save(subject);
    }
  }

  async update(id: number, subject: Subject) {
    const oldSubject = await this.subjectRepo.findOne(id);

    if (oldSubject) {
      const updatedSubject: Subject = { ...oldSubject, ...subject };
      return await this.subjectRepo.save(updatedSubject);
    }
  }

  async subscribe(id: number, userId: number) {
    const subject = await this.subjectRepo.findOne(id, {
      relations: ["subscribedUsers", "tasks"]
    });
    const user = await this.userRepo.findOne(userId, { relations: ["userTasks"] });

    if (subject && user && user.userType === UserType.STUDENT) {
      subject.tasks.forEach(this.createTaskForUser(user));
      await this.userRepo.save(user);
      subject.subscribedUsers.push(user);
      return await this.subjectRepo.save(subject);
    }
  }

  async delete(id: number) {
    const subject = await this.getById(id);

    if (subject) {
      return await this.subjectRepo.remove(subject);
    }
  }
}
