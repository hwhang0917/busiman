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

  @Column()
  @IsString()
  documentUrl: string;

  @ManyToOne(() => Project, (project) => project.documents, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToMany(() => Employee, (employee) => employee.documents)
  contributors: Employee[];
}
