import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Project } from './entities/project.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Project, Employee])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
