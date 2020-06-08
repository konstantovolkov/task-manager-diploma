import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, getRepository } from 'typeorm';
import { Task } from '../Task/Task.model';
import { User } from '../User/User.model';
import { Exclude } from 'class-transformer';
import { IsNumber, IsDefined, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from './TaskStatus';
import { WorkingSession } from './WorkingSession.model';

@Entity()
export class UserTask {
  @Exclude({ toClassOnly: true })
  @PrimaryGeneratedColumn()
  id: number;
  
  @Exclude({ toClassOnly: true })
  @ManyToOne(
    type => Task,
    task => task.userTasks,
    {
      cascade: true,
      onDelete: "CASCADE"
    }
  )
  task: Task;

  @Exclude()
  @ManyToOne(
    type => User,
    user => user.userTasks,
    {
      onDelete: "CASCADE"
    }
  )
  user: User;

  @Exclude({ toClassOnly: true })
  @OneToMany(
    type => WorkingSession,
    workingSession => workingSession.userTask,
    {
      cascade: true,
    }
  )
  workingSessions: WorkingSession[]

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  status: TaskStatus;

  constructor(task?: Task, status: TaskStatus = TaskStatus.TODO) {
    if (task) {
      this.task = task;
      this.status = status;
    }
  }
}

