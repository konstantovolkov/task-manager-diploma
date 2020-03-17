import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from '../Task/Task.model';
import { User } from '../User/User.model';

@Entity()
export class UserTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spentTime: number;

  @ManyToOne(
    type => Task,
    task => task.userTasks
  )
  task: Task;

  @ManyToOne(
    type => User,
    user => user.userTasks
  )
  user: User;
}
