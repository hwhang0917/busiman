import { IsBoolean } from 'class-validator';
import { LoginUserEntity } from 'src/common/entities/loginuser.entity';
import { Document } from 'src/projects/entities/document.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Employee extends LoginUserEntity {
  @Column({ default: false })
  @IsBoolean()
  isAdmin: boolean;

  @OneToMany(() => Project, (project) => project.projectManager)
  leadingProjects: Project[];

  @ManyToMany(() => Project, (project) => project.assignedMembers)
  assignedProjects: Project[];

  @ManyToMany(() => Document, (document) => document.contributors)
  documents: Document[];
}
