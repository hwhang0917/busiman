import { LoginUserEntity } from 'src/common/entities/loginuser.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Employee extends LoginUserEntity {
  @Column({ default: false })
  isAdmin: boolean;
}
