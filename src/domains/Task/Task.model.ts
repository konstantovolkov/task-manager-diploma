import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Subject } from '../Subject/Subject.model';
import { UserTask } from '../UserTask/UserTask.model';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  estimatedTime: number;

  @ManyToOne(
    type => Subject,
    subject => subject.tasks
  )
  subject: Subject;

  @OneToMany(
    type => UserTask,
    userTask => userTask.task
  )
  userTasks: UserTask[];
}
