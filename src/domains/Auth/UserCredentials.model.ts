import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { UserTask } from '../UserTask/UserTask.model';
import { IsString, IsEmail, IsInt, IsNotEmpty, IsEnum, MinLength } from 'class-validator';
import { Exclude, Expose, TransformClassToPlain } from 'class-transformer';
import { Subject } from '../Subject/Subject.model';
import { User } from '../User/User.model';

@Entity()
export class UserCredentials {
  @Exclude({ toClassOnly: true })
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Column()
  password: string;

  @Exclude({ toClassOnly: true })
  @OneToOne(type => User, user => user.credentials, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user: User
}