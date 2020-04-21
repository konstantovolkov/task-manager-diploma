import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { UserTask } from '../UserTask/UserTask.model';
import { IsString, IsEmail, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Subject } from '../Subject/Subject.model';
import { UserType } from './UserType';

@Entity()
export class User {
  @Exclude({ toClassOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  @Column({
    type: 'enum',
    enum: UserType
  })
  userType: UserType;

  @Exclude()
  @OneToMany(type => Subject, subject => subject.author)
  authoredSubjects: Subject[];

  @Exclude()
  @ManyToMany(type => Subject, subject => subject.subscribedUsers)
  subjects: Subject[];

  @Exclude()
  @OneToMany(
    type => UserTask,
    userTask => userTask.user,
    {
      cascade: true
    }
  )
  userTasks: UserTask[];
}