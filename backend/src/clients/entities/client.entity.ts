import { IsBoolean, IsUrl } from 'class-validator';
import { PersonEntity } from 'src/common/entities/person.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Client extends PersonEntity {
  @Column({ default: false })
  @IsBoolean()
  isOrganization: boolean;

  @Column({ nullable: true })
  @IsUrl()
  website?: string;

  @OneToOne(() => Employee)
  @JoinColumn()
  addedBy: Employee;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];
}
