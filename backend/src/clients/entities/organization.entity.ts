import { CoreEntity } from 'src/common/entities/core.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Organization extends CoreEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ nullable: true })
  website?: string;

  @OneToOne(() => Employee)
  @JoinColumn()
  addedBy: Employee;
}
