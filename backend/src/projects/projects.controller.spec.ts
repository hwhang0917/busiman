import { Test, TestingModule } from '@nestjs/testing';
import { mockProjectServiceFunctions } from 'src/mock/service.mock';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let projectService: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        { provide: ProjectsService, useValue: mockProjectServiceFunctions },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    projectService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(projectService).toBeDefined();
  });
});
