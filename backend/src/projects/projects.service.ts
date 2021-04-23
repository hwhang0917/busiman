import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { AuthErr, DNEerr } from 'src/errors/message.error';
import { Repository } from 'typeorm';
import { CreateDocumentInput } from './dto/create-document.dto';
import { CreateProjectInput } from './dto/create-project.dto';
import { UpdateDocumentInput } from './dto/update-document.dto';
import { UpdateProjectInput } from './dto/update-project.dto';
import { Document } from './entities/document.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly projects: Repository<Project>,
    @InjectRepository(Document)
    private readonly documents: Repository<Document>,
  ) {}

  //   Create
  async createProject(
    authUser: Employee,
    createProjectInput: CreateProjectInput,
  ) {
    const newProject = this.projects.create({
      ...createProjectInput,
      projectManager: authUser,
      assignedMembers: [authUser],
    });
    try {
      return await this.projects.save(newProject);
    } catch (e) {
      throw e;
    }
  }
  async createDocument(
    authUser: Employee,
    projectId: number,
    createDocumentInput: CreateDocumentInput,
  ) {
    const project = await this.projects.findOne(projectId);
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    const newDocument = this.documents.create({
      ...createDocumentInput,
      project,
      contributors: [authUser],
    });
    project.documents.push(newDocument);
    try {
      await this.projects.save(project);
      return await this.documents.save(newDocument);
    } catch (e) {
      throw e;
    }
  }

  //   Update
  async updateProject(
    authUser: Employee,
    projectId: number,
    { title, revenue, status }: UpdateProjectInput,
  ) {
    const project = await this.projects.findOne(projectId, {
      relations: ['projectManager'],
    });
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    if (project.projectManager.id !== authUser.id && !authUser.isAdmin) {
      throw new UnauthorizedException(AuthErr.project);
    }

    if (title) project.title = title;
    if (revenue) project.revenue = revenue;
    if (status) project.status = status;

    try {
      return await this.projects.save(project);
    } catch (e) {
      throw e;
    }
  }
  async updateDocument(
    authUser: Employee,
    projectId: number,
    documentId: number,
    { title, documentUrl }: UpdateDocumentInput,
  ) {
    const project = await this.projects.findOne(projectId);
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    const document = await this.documents.findOne(documentId, {
      relations: ['contributors'],
    });
    if (!document) {
      throw new NotFoundException(DNEerr.document);
    }
    const contributorIds = document.contributors.map((c) => c.id);
    if (!contributorIds.includes(authUser.id) && !authUser.isAdmin) {
      throw new UnauthorizedException(AuthErr.document);
    }

    if (title) document.title = title;
    if (documentUrl) document.documentUrl = documentUrl;

    try {
      return await this.documents.save(document);
    } catch (e) {
      throw e;
    }
  }

  //   Read
  async findAllProjects() {
    return await this.projects.find();
  }
  async findProjectById(id: number) {
    const project = await this.projects.findOne(id);
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    return project;
  }
  async findAllDocuments(projectId: number) {
    const project = await this.projects.findOne(projectId, {
      relations: ['documents'],
    });
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    return project.documents;
  }
  async findDocumentById(projectId: number, documentId: number) {
    const project = await this.projects.findOne(projectId);
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    const document = await this.documents.findOne(documentId);
    if (!document) {
      throw new NotFoundException(DNEerr.document);
    }
    return document;
  }

  //   Delete
  async deleteProject(authUser: Employee, projectId: number) {
    const project = await this.projects.findOne(projectId, {
      relations: ['projectManager'],
    });
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    if (project.projectManager.id !== authUser.id && !authUser.isAdmin) {
      throw new UnauthorizedException(AuthErr.project);
    }
    return this.projects.remove(project);
  }
  async deleteDocument(
    authUser: Employee,
    projectId: number,
    documentId: number,
  ) {
    const project = await this.projects.findOne(projectId);
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    const document = await this.documents.findOne(documentId, {
      relations: ['contributors'],
    });
    const contributorIds = document.contributors.map((c) => c.id);
    if (!contributorIds.includes(authUser.id) && !authUser.isAdmin) {
      throw new UnauthorizedException(AuthErr.document);
    }
    return this.documents.remove(document);
  }
}
