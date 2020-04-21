import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from '../Task/Task.model';
import { User } from '../User/User.model';
import { Exclude } from 'class-transformer';
import { IsNumber, IsDefined, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from './TaskStatus';

@Entity()
export class UserTask {
  @Exclude({ toClassOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  spentTime: number;

  @Exclude()
  @ManyToOne(
    type => Task,
    task => task.userTasks,
    {
      cascade: true
    }
  )
  task: Task;

  @Exclude()
  @ManyToOne(
    type => User,
    user => user.userTasks,
  )
  user: User;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @Column({
    type: 'enum',
    enum: TaskStatus,
    nullable: true
  })
  status: TaskStatus;

  constructor(task?: Task) {
    if (task) {
      this.task = task;
    }
  }
}
