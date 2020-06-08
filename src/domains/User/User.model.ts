import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { UserTask } from '../UserTask/UserTask.model';
import { IsString, IsEmail, IsInt, IsNotEmpty, IsEnum, ValidateNested } from 'class-validator';
import { Exclude, Expose, TransformClassToPlain } from 'class-transformer';
import { Subject } from '../Subject/Subject.model';
import { UserType } from './UserType';
import { UserCredentials } from '../Auth/UserCredentials.model';

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

  @ValidateNested()
  @OneToOne(type => UserCredentials, credentials => credentials.user, {
    cascade: true
  })
  credentials: UserCredentials;
}