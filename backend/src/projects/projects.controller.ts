import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Approved } from 'src/auth/decorators/approved.decorator';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { X_JWT_HEADER } from 'src/common/common.constant';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateDocumentInput } from './dto/create-document.dto';
import { CreateProjectInput } from './dto/create-project.dto';
import { UpdateDocumentInput } from './dto/update-document.dto';
import { UpdateProjectInput } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@ApiHeader({
  name: X_JWT_HEADER,
  description: 'Login JWT(Json Web Token)',
})
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Approved()
  @Get()
  getAllProjects() {
    return this.projectsService.findAllProjects();
  }

  @Approved()
  @Get(':id')
  getProjectById(@Param('id') id: number) {
    return this.projectsService.findProjectById(id);
  }

  @Approved()
  @Get(':id/documents')
  getDocuments(@Param('id') projectId: number) {
    return this.projectsService.findAllDocuments(projectId);
  }

  @Approved()
  @Get(':projectId/documents/:docId')
  getDocumentById(
    @Param('projectId') projectId: number,
    @Param('docId') docId: number,
  ) {
    return this.projectsService.findDocumentById(projectId, docId);
  }

  @Approved()
  @Post()
  createProject(
    @AuthUser() authUser: Employee,
    @Body() createProjectDto: CreateProjectInput,
  ) {
    return this.projectsService.createProject(authUser, createProjectDto);
  }

  @Approved()
  @Post(':id/documents')
  createDocument(
    @AuthUser() authUser: Employee,
    @Param('id') projectId: number,
    @Body() createDocumentDto: CreateDocumentInput,
  ) {
    return this.projectsService.createDocument(
      authUser,
      projectId,
      createDocumentDto,
    );
  }

  @Approved()
  @Put(':id')
  updateProject(
    @AuthUser() authUser: Employee,
    @Param('id') projectId: number,
    @Body() updateProjectDto: UpdateProjectInput,
  ) {
    return this.projectsService.updateProject(
      authUser,
      projectId,
      updateProjectDto,
    );
  }

  @Approved()
  @Put(':projectId/documents/:docId')
  updateDocument(
    @AuthUser() authUser: Employee,
    @Param('projectId') projectId: number,
    @Param('docId') docId: number,
    @Body() updateDocumentDto: UpdateDocumentInput,
  ) {
    return this.projectsService.updateDocument(
      authUser,
      projectId,
      docId,
      updateDocumentDto,
    );
  }

  @Approved()
  @Delete(':id')
  deleteProject(@AuthUser() authUser: Employee, @Param('id') id: number) {
    return this.projectsService.deleteProject(authUser, id);
  }

  @Approved()
  @Delete(':projectId/documents/:docId')
  deleteDocument(
    @AuthUser() authUser: Employee,
    @Param('projectId') projectId: number,
    @Param('docId') docId: number,
  ) {
    return this.projectsService.deleteDocument(authUser, projectId, docId);
  }
}
