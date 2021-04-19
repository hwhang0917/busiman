import { IsEmail } from 'class-validator';
import { Column } from 'typeorm';
import { PersonEntity } from './person.entity';

export class LoginUserEntity extends PersonEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;
}
