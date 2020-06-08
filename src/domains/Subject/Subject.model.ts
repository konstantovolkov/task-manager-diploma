import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne
} from "typeorm";
import { Task } from "../Task/Task.model";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString, IsInt } from "class-validator";
import { User } from "../User/User.model";

@Entity()
export class Subject {
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

  @ManyToMany(
    type => User,
    user => user.subjects,
    {
      cascade: true
    }
  )
  @JoinTable()
  subscribedUsers: User[];

  @Exclude({ toClassOnly: true })
  @Column()
  authorId: number;

  @Exclude()
  @ManyToOne(
    type => User,
    user => user.authoredSubjects,
    {
      cascade: true,
      onDelete: "CASCADE"
    }
  )
  author: User;

  @Exclude()
  @OneToMany(
    type => Task,
    task => task.subject,
    {
      cascade: true
    }
  )
  tasks: Task[];
}
