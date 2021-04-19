import { LoginUserEntity } from 'src/common/entities/loginuser.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Employee extends LoginUserEntity {
  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Project, (project) => project.projectManager)
  leadingProjects: Project[];

  @ManyToMany(() => Project, (project) => project.assignedMembers)
  assignedProjects: Project[];
}
