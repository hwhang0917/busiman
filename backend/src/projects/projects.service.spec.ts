import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  MockRepository,
  mockRepositoryFunctions,
} from 'src/mock/repository.mock';
import { Document } from './entities/document.entity';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectRepository: MockRepository<Project>;
  let documentRepository: MockRepository<Document>;
  let employeeRepository: MockRepository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepositoryFunctions,
        },
        {
          provide: getRepositoryToken(Document),
          useValue: mockRepositoryFunctions,
        },
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepositoryFunctions,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectRepository = module.get(getRepositoryToken(Project));
    documentRepository = module.get(getRepositoryToken(Document));
    employeeRepository = module.get(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(projectRepository).toBeDefined();
    expect(documentRepository).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });
});
