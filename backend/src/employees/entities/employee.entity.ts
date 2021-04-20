import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsBoolean } from 'class-validator';
import { LoginUserEntity } from 'src/common/entities/loginuser.entity';
import { Document } from 'src/projects/entities/document.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(passwordString: string): Promise<boolean> {
    try {
      return await bcrypt.compare(passwordString, this.password);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
