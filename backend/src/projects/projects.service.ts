import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { AuthErr, DNEerr } from 'src/errors/message.error';
import {
  Between,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateDocumentInput } from './dto/create-document.dto';
import { CreateProjectInput } from './dto/create-project.dto';
import { FilterDocumentInput } from './dto/filter-documents.dto';
import { FilterProjectInput } from './dto/filter-project.dto';
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
    @InjectRepository(Employee)
    private readonly employees: Repository<Employee>,
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
    if (project.documents) project.documents.push(newDocument);
    else project.documents = [newDocument];
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
    { title, documentUrl, contributorId }: UpdateDocumentInput,
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
    if (contributorId) {
      const employee = await this.employees.findOne(contributorId);
      if (!employee) {
        throw new NotFoundException(DNEerr.employee);
      }
      if (document.contributors) document.contributors.push(employee);
      else document.contributors = [employee];
    }

    try {
      return await this.documents.save(document);
    } catch (e) {
      throw e;
    }
  }

  //   Read
  async findAllProjects(query: FilterProjectInput) {
    const filterParam: FilterProjectInput = {};
    if (query.title) {
      filterParam.title = ILike(`${query.title}%`);
    }
    if (query.status) {
      filterParam.status = query.status;
    }
    if (query.minRevenue && !query.maxRevenue) {
      filterParam.revenue = MoreThanOrEqual(query.minRevenue);
    }
    if (!query.minRevenue && query.maxRevenue) {
      filterParam.revenue = LessThanOrEqual(query.maxRevenue);
    }
    if (query.minRevenue && query.maxRevenue) {
      filterParam.revenue = Between(query.minRevenue, query.maxRevenue);
    }
    return await this.projects.find(filterParam);
  }
  async findProjectById(id: number) {
    const project = await this.projects.findOne(id);
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    return project;
  }
  async findAllDocuments(projectId: number, query: FilterDocumentInput) {
    const project = await this.projects.findOne(projectId, {
      relations: ['documents'],
    });
    if (!project) {
      throw new NotFoundException(DNEerr.project);
    }
    if (!query.title) return project.documents;
    const documents = await this.documents.find({
      project,
      title: ILike(`${query.title}%`),
    });
    return documents;
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
