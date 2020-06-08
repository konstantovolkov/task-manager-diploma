import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Exclude, Type } from "class-transformer";
import { UserTask } from "./UserTask.model";
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
export class WorkingSession {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  message: string;

  @Type(() => Date)
  @Column("timestamp with time zone")
  createdAt: Date;

  @Type(() => Date)
  @Column("timestamp with time zone")
  finishedAt: Date;

  @Exclude()
  @ManyToOne(
    type => UserTask,
    userTask => userTask.workingSessions,
    {
      onDelete: "CASCADE"
    }
  )
  userTask: UserTask;
}
