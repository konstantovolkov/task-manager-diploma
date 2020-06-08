import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Subject } from "../Subject/Subject.model";
import { UserTask } from "../UserTask/UserTask.model";
import { Exclude } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
  IsInt
} from "class-validator";

@Entity()
export class Task {
  @Exclude({ toClassOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;

  @IsInt()
  @Column()
  estimatedTime: number;

  @Exclude()
  @ManyToOne(
    type => Subject,
    subject => subject.tasks,
    {
      onDelete: "CASCADE"
    }
  )
  subject: Subject;

  @Exclude()
  @OneToMany(
    type => UserTask,
    userTask => userTask.task
  )
  userTasks: UserTask[];
}
