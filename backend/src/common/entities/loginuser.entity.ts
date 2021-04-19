import { Column } from 'typeorm';
import { PersonEntity } from './person.entity';

export class LoginUserEntity extends PersonEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
