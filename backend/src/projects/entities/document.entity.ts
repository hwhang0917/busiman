import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Document extends CoreEntity {
  @Column()
  @IsString()
  title: string;

  @ManyToOne(() => Project, (project) => project.documents)
  project: Project;

  @ManyToMany(() => Employee, (employee) => employee.documents)
  contributors: Employee[];
}
