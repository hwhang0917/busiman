import { Client } from 'src/clients/entities/client.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

export enum Status {
  Pending = 'Pending',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
}

@Entity()
export class Project extends CoreEntity {
  @Column()
  title: string;

  @Column()
  revenue: number;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @ManyToOne(() => Employee, (employee) => employee.leadingProjects, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  projectManager: Employee;

  @ManyToMany(() => Employee, (employee) => employee.assignedProjects)
  assignedMembers: Employee[];

  @ManyToOne(() => Client, (client) => client.projects, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  client?: Client;
}
