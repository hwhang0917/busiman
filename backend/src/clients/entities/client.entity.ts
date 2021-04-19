import { PersonEntity } from 'src/common/entities/person.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Client extends PersonEntity {
  @OneToOne(() => Employee)
  @JoinColumn()
  addedBy: Employee;
}
