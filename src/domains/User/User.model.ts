import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserTask } from '../UserTask/UserTask.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  userType: number;

  @OneToMany(
    type => UserTask,
    userTask => userTask.user
  )
  userTasks: UserTask[];
}
